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

  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const getHref = (path: string) => {
    if (path.startsWith('#')) return path;
    if (path === '/') return homePath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return homePath === '/' ? cleanPath : `${homePath}${cleanPath}`;
  }

  // Updated fallback links to point Work to /projects
  const fallbackLinks = [
    { href: '/projects', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Videos' }
  ]
  
  const rawLinks = Array.isArray(dict?.links) ? dict.links : fallbackLinks
  const navLinks = rawLinks.map((link: any) => ({
    ...link,
    href: getHref(link.href)
  }))

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playWhoosh()

    const [pathPart, hashPart] = href.split('#')
    const isCurrentPage = pathPart === '' || pathPart === pathname || pathPart === `${pathname}/`

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
      onLinkClick?.()
    }
  }

  return (
    <Stack direction={props.direction || { base: 'column', md: 'row' }} alignItems="center" gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((item: any) => {
        // Simple active state check: does the current pathname include the link's path?
        const isActive = item.href !== homePath 
          ? pathname.includes(item.href) 
          : pathname === homePath

        return (
          <Link
            key={item.href}
            asChild
            fontWeight={isActive ? "bold" : "medium"}
            color={isActive ? "colorPalette.fg" : "fg.muted"}
            _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
            onClick={(e) => handleScroll(e, item.href)}
            onMouseEnter={playHover}
          >
            <NextLink href={item.href}>{item.label}</NextLink>
          </Link>
        )
      })}
    </Stack>
  )
}