'use client'

import { Box, Flex, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import NextLink from 'next/link'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'

interface PageLink {
  title: string
  href: string
}

interface PageNavProps {
  prev?: PageLink | null
  next?: PageLink | null
  dict?: any
  pages?: any[]
}

export const Block = ({ prev: propPrev, next: propNext, dict, pages = [] }: PageNavProps) => {
  const { playHover, playClick } = useUiSounds()
  const pathname = usePathname() || '/'
  const router = useRouter()
  
  const [currentHash, setCurrentHash] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  // Listen to hash changes, but explicitly add `pathname` so cross-page soft transitions
  // (e.g., from /#process to /about#testimonials) force the hash to resync.
  useEffect(() => {
    setIsMounted(true)
    setCurrentHash(window.location.hash)
    
    const syncHash = () => setCurrentHash(window.location.hash)
    
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('app-hash-change', syncHash)
    
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('app-hash-change', syncHash)
    }
  }, [pathname])

  const segments = pathname.split('/').filter(Boolean)
  const isProjectDetail = segments.length >= 2 && segments[segments.length - 2] === 'projects'

  const links = useMemo(() => {
    if (!pages || pages.length === 0) return []

    const validPages = pages.filter(p => p && ['MAIN_MENU', 'STANDARD', 'EXPLORE'].includes(p.page_type))
    
    // RESTORED: Group MAIN_MENU first, EXPLORE second. 
    // This ensures your continuous "Explore" track (Process -> Testimonials -> FAQs) stays sequentially grouped.
    const sortedData = validPages.sort((a, b) => {
      const aType = (a.page_type === 'MAIN_MENU' || a.page_type === 'STANDARD') ? 1 : 2
      const bType = (b.page_type === 'MAIN_MENU' || b.page_type === 'STANDARD') ? 1 : 2

      if (aType !== bType) return aType - bType
      return (a.sort_order || 0) - (b.sort_order || 0)
    })

    const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

    return sortedData.map(p => {
      let slug = p.slug || ''
      if (slug.startsWith('/#')) slug = slug.substring(1)

      let href = homePath
      
      if (slug === 'home' || slug === '/') {
        href = homePath
      } else if (slug.startsWith('#')) {
        href = homePath === '/' ? `/${slug}` : `${homePath}${slug}`
      } else if (slug.includes('#')) {
        const [pagePart, hashPart] = slug.split('#')
        const cleanPage = pagePart.startsWith('/') ? pagePart : `/${pagePart}`
        const base = homePath === '/' ? cleanPage : `${homePath}${cleanPage}`
        href = `${base}#${hashPart}`
      } else {
        const cleanPath = slug.startsWith('/') ? slug : `/${slug}`
        href = homePath === '/' ? cleanPath : `${homePath}${cleanPath}`
      }

      return {
        title: p.nav_title || p.title || '',
        href
      }
    })
  }, [pages, pathname])

  if (!isMounted || isProjectDetail || links.length === 0) return null;

  let computedPrev: PageLink | null = null;
  let computedNext: PageLink | null = null;

  if (propPrev === undefined && propNext === undefined) {
    const normalizePath = (p: string) => {
      if (!p) return '/'
      return p.replace(/\/+#/, '#').replace(/\/+$/, '') || '/'
    }

    const fullPath = currentHash ? `${pathname}${currentHash}` : pathname
    const cleanFullPath = normalizePath(fullPath)
    const cleanPathname = normalizePath(pathname)

    // 1. Try to match the exact hash path first
    let currentIndex = links.findIndex(link => normalizePath(link.href) === cleanFullPath)
    
    // 2. If no hash match is found, fallback to matching the base pathname
    if (currentIndex === -1) {
      currentIndex = links.findIndex(link => normalizePath(link.href.split('#')[0]) === cleanPathname)
    }

    if (currentIndex !== -1) {
      computedPrev = currentIndex > 0 ? links[currentIndex - 1] : null
      computedNext = currentIndex < links.length - 1 ? links[currentIndex + 1] : null
    }
  }

  const prev = propPrev !== undefined ? propPrev : computedPrev
  const next = propNext !== undefined ? propNext : computedNext

  const checkIsSamePage = (href: string) => {
    const basePath = href.split('#')[0]
    const normalizePath = (p: string) => (p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/'))
    return normalizePath(basePath) === normalizePath(pathname)
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playClick()
    
    if (href.includes('#') && checkIsSamePage(href)) {
      const hashPart = `#${href.split('#')[1]}`
      const elementId = hashPart.replace('#', '')
      const element = document.getElementById(elementId)
      
      if (element) {
        e.preventDefault()
        
        // Safely push to the Next.js router without reloading or losing state
        router.push(`${pathname}${hashPart}`, { scroll: false })
        window.dispatchEvent(new Event('app-hash-change')) 
        
        // Custom 120px offset smooth scroll
        setTimeout(() => {
          const offset = 120
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }, 10)
      }
    }
  }

  if (!prev && !next) return null;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
      {prev ? (
        <Box asChild>
          <NextLink 
            href={prev.href} 
            onClick={(e) => handleLinkClick(e, prev.href)} 
            onMouseEnter={playHover} 
            scroll={!(prev.href.includes('#') && checkIsSamePage(prev.href))}
          >
            <Flex
              direction="column"
              align="flex-start"
              p={{ base: '6', md: '10' }}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.subtle"
              bg="bg.panel"
              shadow="sm"
              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ 
                bg: 'bg.muted', 
                borderColor: 'border.muted',
                shadow: 'md',
                transform: 'translateY(-2px)'
              }}
              role="group"
              cursor="pointer"
            >
              <Stack direction="row" align="center" color="fg.muted" mb="3" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                <Icon as={LuArrowLeft} transition="transform 0.2s" _groupHover={{ transform: 'translateX(-4px)' }} />
                <Text>{dict?.previous || "Previous"}</Text>
              </Stack>
              <Text textStyle={{ base: '2xl', md: '3xl' }} fontWeight="medium" color="fg.default">
                {prev.title}
              </Text>
            </Flex>
          </NextLink>
        </Box>
      ) : <Box />} 

      {next && (
        <Box asChild>
          <NextLink 
            href={next.href} 
            onClick={(e) => handleLinkClick(e, next.href)} 
            onMouseEnter={playHover} 
            scroll={!(next.href.includes('#') && checkIsSamePage(next.href))}
          >
            <Flex
              direction="column"
              align="flex-end"
              textAlign="right"
              p={{ base: '6', md: '10' }}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.subtle"
              bg="bg.panel"
              shadow="sm"
              transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ 
                bg: 'bg.muted', 
                borderColor: 'border.muted',
                shadow: 'md',
                transform: 'translateY(-2px)'
              }}
              role="group"
              cursor="pointer"
            >
              <Stack direction="row" align="center" color="fg.muted" mb="3" fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                <Text>{dict?.next || "Up next"}</Text>
                <Icon as={LuArrowRight} transition="transform 0.2s" _groupHover={{ transform: 'translateX(4px)' }} />
              </Stack>
              <Text textStyle={{ base: '2xl', md: '3xl' }} fontWeight="medium" color="fg.default">
                {next.title}
              </Text>
            </Flex>
          </NextLink>
        </Box>
      )}
    </SimpleGrid>
  )
}