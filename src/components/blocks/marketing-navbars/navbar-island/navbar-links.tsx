'use client'

import { useState, useEffect } from 'react'
import { Link, Stack, type StackProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { supabase } from '@/lib/supabase'

interface NavbarLinksProps extends StackProps {
  dict?: any;
  onLinkClick?: () => void;
}

export const NavbarLinks = ({ dict, onLinkClick, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  const pathname = usePathname() || ''
  const [navLinks, setNavLinks] = useState<any[]>([])

  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  // Fetch MAIN_MENU pages from Supabase
  useEffect(() => {
    const fetchNavLinks = async () => {
      const { data } = await supabase
        .from('pages')
        .select('id, slug, title, nav_title, sort_order')
        .eq('status', 'PUBLISHED')
        .eq('page_type', 'MAIN_MENU')
        .order('sort_order', { ascending: true })

      if (data) {
        setNavLinks(data)
      }
    }
    fetchNavLinks()
  }, [])

  // Safely converts database slugs to valid, localized absolute hrefs
  const getHref = (slug: string) => {
    if (!slug) return homePath;
    if (slug === 'home' || slug === '/') return homePath;
    
    // Handle direct hash links (e.g., "#process" meant for the home page)
    if (slug.startsWith('#')) {
      const base = homePath === '/' ? '' : homePath;
      return `${base}/${slug}`; // e.g., /en/#process
    }
    
    // Handle path + hash links (e.g., "about#services")
    if (slug.includes('#')) {
      const [pagePart, hashPart] = slug.split('#');
      const cleanPage = pagePart.startsWith('/') ? pagePart : `/${pagePart}`;
      const base = homePath === '/' ? cleanPage : `${homePath}${cleanPage}`;
      return `${base}#${hashPart}`; // e.g., /en/about#services
    }

    // Standard pages
    const cleanPath = slug.startsWith('/') ? slug : `/${slug}`;
    return homePath === '/' ? cleanPath : `${homePath}${cleanPath}`;
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    // If it's a standard link, just let NextLink route normally
    if (!href.includes('#')) {
      playWhoosh();
      onLinkClick?.()
      return;
    }

    const [pathPart, hashPart] = href.split('#')
    
    // Normalize paths to ensure accurate matching (e.g. '/en/' matches '/en')
    const normalizePath = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/');
    const isCurrentPage = normalizePath(pathPart) === normalizePath(pathname);

    // If the hash is on the current page, scroll smoothly
    if (hashPart && isCurrentPage) {
      e.preventDefault()
      const element = document.getElementById(hashPart)
      
      if (element) {
        onLinkClick?.()

        setTimeout(() => {
          const offset = 24 
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          
          window.history.pushState(null, '', `#${hashPart}`)
        }, 150)
      }
    } else {
      // If the hash is on a DIFFERENT page, let NextLink handle the hard navigation
      playWhoosh()
      onLinkClick?.()
    }
  }

  return (
    <Stack direction={props.direction || { base: 'column', md: 'row' }} alignItems="center" gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((page: any) => {
        const href = getHref(page.slug)
        
        // FIX: Extract the translation from the navbar dictionary array by matching the slug
        const dictLink = dict?.links?.find((l: any) => l.href.includes(page.slug))
        const label = dictLink?.label || dict?.[`${page.slug}Link`] || page.nav_title || page.title

        // Simple active state check
        const isActive = href !== homePath 
          ? pathname.includes(href.split('#')[0]) // Ignore hash when checking active state
          : pathname === homePath || pathname === `${homePath}/`

        // Skip rendering the home page link in the top nav (since the Logo handles that)
        if (page.slug === 'home' || page.slug === '/') return null;

        return (
          <Link
            key={page.id}
            asChild
            fontWeight={isActive ? "bold" : "medium"}
            color={isActive ? "colorPalette.fg" : "fg.muted"}
            _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
            onClick={(e) => handleScroll(e, href)}
            onMouseEnter={playHover}
          >
            <NextLink href={href}>{label}</NextLink>
          </Link>
        )
      })}
    </Stack>
  )
}