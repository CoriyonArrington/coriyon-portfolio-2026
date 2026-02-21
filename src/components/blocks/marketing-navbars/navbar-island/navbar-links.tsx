'use client'

import { Link, Stack, type StackProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { LuChevronDown } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"

interface NavbarLinksProps extends StackProps {
  dict?: any;
  onLinkClick?: () => void;
}

export const NavbarLinks = ({ dict, onLinkClick, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  
  const isMobile = props.direction === 'column'

  // Prioritized links for the main desktop view
  const mainLinks = [
    { label: dict?.projects || 'Projects', href: '#projects' },
    { label: dict?.services || 'Services', href: '#services' },
    { label: dict?.about || 'About', href: '#about' },
  ]

  // Secondary links tucked into the "More" dropdown on desktop
  const moreLinks = [
    { label: dict?.process || 'Process', href: '#process' },
    { label: dict?.blog || 'Blog', href: '#blog' },
    { label: dict?.testimonials || 'Testimonials', href: '#testimonials' },
    { label: dict?.faqs || 'FAQs', href: '#faqs' },
    { label: dict?.contact || 'Contact', href: '#contact' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playWhoosh()

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
    <Stack direction={props.direction || { base: 'column', md: 'row' }} gap={{ base: '6', md: '8' }} {...props}>
      {/* High priority links */}
      {mainLinks.map((item) => (
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

      {/* Conditional rendering based on mobile/desktop */}
      {isMobile ? (
        moreLinks.map((item) => (
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
        ))
      ) : (
        <MenuRoot positioning={{ placement: "bottom-start", offset: { mainAxis: 16 } }}>
          <MenuTrigger asChild>
            <Link
              as="button"
              fontWeight="medium"
              color="fg.muted"
              _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
              display="flex"
              alignItems="center"
              gap="1"
              cursor="pointer"
              onMouseEnter={playHover}
            >
              {dict?.more || 'More'} <LuChevronDown />
            </Link>
          </MenuTrigger>
          <MenuContent bg="bg.panel" borderRadius="md" boxShadow="md" zIndex="popover">
            {moreLinks.map((item) => (
              <MenuItem 
                key={item.href} 
                value={item.href} 
                asChild 
                cursor="pointer" 
                onClick={(e) => handleScroll(e, item.href)} 
                onMouseEnter={playHover}
                color="fg.muted"
                _hover={{ color: 'colorPalette.fg', bg: 'bg.muted' }}
                px="4"
                py="2"
              >
                <NextLink href={item.href}>{item.label}</NextLink>
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      )}
    </Stack>
  )
}