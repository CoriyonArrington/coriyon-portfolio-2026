'use client'

import { Link, Stack, type StackProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface NavLink {
  id: string;
  slug: string;
  nav_title: string;
}

interface NavbarLinksProps extends StackProps {
  links: NavLink[];
  onLinkClick?: () => void;
}

export const NavbarLinks = ({ links, onLinkClick, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  const pathname = usePathname() || ''
  const router = useRouter()
  
  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const getHref = (slug: string) => {
    if (!slug) return homePath;
    if (slug === 'home' || slug === '/') return homePath;
    
    if (slug.startsWith('#')) {
      return homePath === '/' ? `/${slug}` : `${homePath}${slug}`; 
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

  // Ensures we only disable Next.js scroll if we are staying on the exact same page
  const checkIsSamePage = (href: string) => {
    const basePath = href.split('#')[0]
    const normalizePath = (p: string) => (p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/'))
    return normalizePath(basePath) === normalizePath(pathname)
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (!href.includes('#')) {
      playWhoosh();
      onLinkClick?.()
      return;
    }

    const hashPart = href.split('#')[1]

    if (hashPart && checkIsSamePage(href)) {
      e.preventDefault()
      
      const element = document.getElementById(hashPart)
      if (element) {
        onLinkClick?.()

        // Safely update Next router without reloading
        router.push(`${pathname}#${hashPart}`, { scroll: false })
        window.dispatchEvent(new Event('app-hash-change'))

        // Standardized 10ms offset timeout
        setTimeout(() => {
          const offset = 120 // Updated to match your standard 120px offset across the app
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 10)
      }
    } else {
      playWhoosh()
      onLinkClick?.()
    }
  }

  if (!links || links.length === 0) return null;

  return (
    <Stack direction={props.direction || { base: 'column', md: 'row' }} alignItems="center" gap={{ base: '6', md: '8' }} {...props}>
      {links.map((page: NavLink) => {
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
            {/* FIXED: Dynamic scroll prop */}
            <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
          </Link>
        )
      })}
    </Stack>
  )
}