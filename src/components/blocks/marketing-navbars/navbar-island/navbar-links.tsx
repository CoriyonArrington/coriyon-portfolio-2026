'use client'

import { Link, Stack, type StackProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface NavbarLinksProps extends StackProps {
  dict?: any;
  onLinkClick?: () => void;
}

export const NavbarLinks = ({ dict, onLinkClick, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()

  const navLinks = [
    { label: dict?.projects || 'Projects', href: '#projects' },
    { label: dict?.testimonials || 'Testimonials', href: '#testimonials' },
    { label: dict?.faqs || 'FAQs', href: '#faqs' },
    { label: dict?.contact || 'Contact', href: '#contact' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    playWhoosh()

    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      
      if (element) {
        onLinkClick?.()

        setTimeout(() => {
          // Changed offset from -48 to 120 to perfectly clear the floating navbar
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
    <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {navLinks.map((item) => (
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