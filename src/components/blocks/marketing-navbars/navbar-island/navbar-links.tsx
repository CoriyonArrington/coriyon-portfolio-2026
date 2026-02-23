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

  // Determine if we are on the home page and get the base path (handles locales like /en, /es)
  const segments = pathname.split('/').filter(Boolean)
  const isHome = segments.length === 0 || (segments.length === 1 && segments[0].length === 2)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  // Dynamic href generator: uses just the hash on the home page, or appends the root path on subpages
  const getHref = (hash: string) => isHome ? hash : `${homePath}${hash}`

  // Map the links directly from your JSON payload, with a safety fallback
  const fallbackLinks = [
    { href: '#projects', label: 'Projects' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact' }
  ]
  
  const rawLinks = Array.isArray(dict?.links) ? dict.links : fallbackLinks
  const navLinks = rawLinks.map((link: any) => ({
    ...link,
    href: getHref(link.href)
  }))

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playWhoosh()

    // Only intercept and smooth scroll if it's a direct hash link (meaning we are on the home page)
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      
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
          
          window.history.pushState(null, '', href)
        }, 150)
      }
    } else {
      onLinkClick?.()
    }
  }

  return (
    <Stack direction={props.direction || { base: 'column', md: 'row' }} alignItems="center" gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((item: any) => (
        <Link
          key={item.href}
          asChild
          fontWeight="medium"
          color="fg.muted"
          _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
          onClick={(e) => handleScroll(e, item.href)}
          onMouseEnter={playHover}
        >
          <NextLink href={item.href}>{item.label}</NextLink>
        </Link>
      ))}
    </Stack>
  )
}