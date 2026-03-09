'use client'

import { Box, Flex, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import NextLink from 'next/link'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface PageLink {
  title: string
  href: string
}

interface PageNavProps {
  prev?: PageLink | null
  next?: PageLink | null
  dict?: any
}

export const Block = ({ prev: propPrev, next: propNext, dict }: PageNavProps) => {
  const { playHover, playClick } = useUiSounds()
  const pathname = usePathname() || '/'
  
  const [dynamicPrev, setDynamicPrev] = useState<PageLink | null>(null)
  const [dynamicNext, setDynamicNext] = useState<PageLink | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // If props are explicitly provided, bypass dynamic fetching
    if (propPrev !== undefined || propNext !== undefined) {
      setIsLoaded(true)
      return
    }

    const fetchLinks = async () => {
      // Fetch all published pages to navigate through them in sort order
      const { data } = await supabase
        .from('pages')
        .select('slug, nav_title, title, page_type')
        .eq('status', 'PUBLISHED')
        .order('sort_order', { ascending: true })
      
      if (data && data.length > 0) {
        const links = data.map(p => {
          let href = p.slug;
          if (href === 'home') href = '/';
          else if (href.startsWith('#')) href = `/${href}`; // Ensure hashes anchor to the root
          else if (!href.startsWith('/')) href = `/${href}`;
          
          return {
            title: p.nav_title || p.title,
            href
          }
        });

        // Resolve current location, factoring in hash anchors if present
        const currentHash = window.location.hash;
        const fullPath = currentHash ? `${pathname}${currentHash}` : pathname;

        let currentIndex = links.findIndex(link => link.href === fullPath);
        
        // Fallback to matching just the pathname if an exact hash match isn't found
        if (currentIndex === -1) {
          currentIndex = links.findIndex(link => {
            const linkPath = link.href.split('#')[0] || '/';
            const currentLinkPath = linkPath === '' ? '/' : linkPath;
            return currentLinkPath === pathname;
          });
        }

        if (currentIndex !== -1) {
          setDynamicPrev(currentIndex > 0 ? links[currentIndex - 1] : null);
          setDynamicNext(currentIndex < links.length - 1 ? links[currentIndex + 1] : null);
        } else {
          setDynamicPrev(null);
          setDynamicNext(null);
        }
      }
      setIsLoaded(true);
    }
    
    fetchLinks()
    
    // Listen for hash changes to update the nav dynamically while on the same page
    const handleHashChange = () => fetchLinks();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname, propPrev, propNext])

  const prev = propPrev !== undefined ? propPrev : dynamicPrev;
  const next = propNext !== undefined ? propNext : dynamicNext;

  if (!isLoaded && propPrev === undefined && propNext === undefined) return null;
  if (!prev && !next) return null

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" w="full">
      {prev ? (
        <Box asChild>
          <NextLink href={prev.href} onClick={playClick} onMouseEnter={playHover}>
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
      ) : <Box />} {/* Empty box to maintain the right-side alignment if there is no previous page */}

      {next && (
        <Box asChild>
          <NextLink href={next.href} onClick={playClick} onMouseEnter={playHover}>
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