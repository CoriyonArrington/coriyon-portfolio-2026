'use client'

import { Link, Stack, type StackProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface NavbarLinksProps extends StackProps {
  dict?: any;
  onLinkClick?: () => void;
}

export const NavbarLinks = ({ dict, onLinkClick, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  const pathname = usePathname() || ''
  
  // OPTIMIZATION: Removed useEffect database call! 
  // We rely entirely on the server-provided dictionary, guaranteeing zero layout shift.
  const navLinks = dict?.links?.map((link: any) => ({
    id: link.href,
    slug: link.href.replace('/', ''),
    nav_title: link.label
  })) || [
    { id: 'projects', slug: 'projects', nav_title: 'Work' },
    { id: 'about', slug: 'about', nav_title: 'About' },
    { id: 'blog', slug: 'blog', nav_title: 'Videos' }
  ]

  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const getHref = (slug: string) => {
    if (!slug) return homePath;
    if (slug === 'home' || slug === '/') return homePath;
    
    if (slug.startsWith('#')) {
      const base = homePath === '/' ? '' : homePath;
      return `${base}/${slug}`; 
    }
    
    if (slug.includes('#')) {
      const [pagePart, hashPart] = slug.split('#');
      const cleanPage = pagePart.startsWith('/') ? pagePart : `/${pagePart}`;
      const base = homePath === '/' ? cleanPage : `${homePath}${cleanPage}`;
      return `${base}#${hashPart}`; 
    }

    const cleanPath = slug.startsWith('/') ? slug : `/${slug}`;
    return homePath === '/' ? cleanPath : `${homePath}${cleanPath}`;
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (!href.includes('#')) {
      playWhoosh();
      onLinkClick?.()
      return;
    }

    const [pathPart, hashPart] = href.split('#')
    
    const normalizePath = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/');
    const isCurrentPage = normalizePath(pathPart) === normalizePath(pathname);

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
      playWhoosh()
      onLinkClick?.()
    }
  }

  return (
    <Stack direction={props.direction || { base: 'column', md: 'row' }} alignItems="center" gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((page: any) => {
        const href = getHref(page.slug)
        const label = page.nav_title

        const isActive = href !== homePath 
          ? pathname.includes(href.split('#')[0]) 
          : pathname === homePath || pathname === `${homePath}/`

        if (page.slug === 'home' || page.slug === '/') return null;

        return (
          <Link
            key={page.id}
            asChild
            fontWeight={isActive ? "bold" : "medium"}
            color={isActive ? "colorPalette.fg" : "fg.muted"}
            transition="color 0.2s"
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