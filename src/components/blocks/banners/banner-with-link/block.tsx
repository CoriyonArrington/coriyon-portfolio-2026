'use client'

import { Box, Container, HStack, IconButton, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { useState } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface BannerProps {
  dict?: any;
}

export const Block = ({ dict }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const { playHover, playClick } = useUiSounds()
  const pathname = usePathname() || ''

  if (!isVisible) return null

  // Determine if we are on the home page and get the base path (handles locales like /en, /es)
  const segments = pathname.split('/').filter(Boolean)
  const isHome = segments.length === 0 || (segments.length === 1 && segments[0].length === 2)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const rawUrl = dict?.url || "#contact"
  // Dynamic href generator: uses just the hash on the home page, or appends the root path on subpages
  const finalUrl = rawUrl.startsWith('#') && !isHome ? `${homePath}${rawUrl}` : rawUrl

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick()
    setIsVisible(false) // Dismiss banner when clicked

    // Only intercept and smooth scroll if it's a direct hash link (meaning we are on the home page)
    if (rawUrl.startsWith('#') && isHome) {
      e.preventDefault()
      const targetId = rawUrl.replace('#', '')
      const element = document.getElementById(targetId)
      
      if (element) {
        const offset = 120 
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        window.history.pushState(null, '', rawUrl)
      }
    }
  }

  return (
    <Box 
      bg="colorPalette.solid" 
      color="white" 
      position="fixed" 
      bottom="0" 
      left="0" 
      right="0" 
      w="full" 
      zIndex={2000} 
      shadow="md"
    >
      <Container py="2.5" maxW="7xl" px={{ base: '4', md: '8' }}>
        <HStack justify="center" position="relative" minH="6">
          <Text fontWeight="medium" fontSize="sm" textAlign="center" pe="8">
            {dict?.text || "🟢 Available for work."}{' '}
            <NextLink 
              href={finalUrl} 
              onClick={handleLinkClick} 
              onMouseEnter={playHover}
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
            >
              {dict?.linkText || "Get in touch →"}
            </NextLink>
          </Text>
          
          <IconButton 
            variant="ghost" 
            aria-label="Close banner" 
            size="xs" 
            color="white"
            _hover={{ bg: 'whiteAlpha.300' }}
            position="absolute"
            right="0"
            onClick={() => {
              playClick()
              setIsVisible(false)
            }}
            onMouseEnter={playHover}
          >
            <LuX />
          </IconButton>
        </HStack>
      </Container>
    </Box>
  )
}