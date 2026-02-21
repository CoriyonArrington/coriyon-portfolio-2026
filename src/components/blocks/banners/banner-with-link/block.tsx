'use client'

import { Box, Container, HStack, IconButton, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { useState } from 'react'
import NextLink from 'next/link'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface BannerProps {
  dict?: any;
}

export const Block = ({ dict }: BannerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const { playHover, playClick } = useUiSounds()

  if (!isVisible) return null

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
            {dict?.text || "👋 Hi, I'm Coriyon! Watch my 90-second intro video."}{' '}
            <NextLink 
              href={dict?.url || "https://www.youtube.com/shorts/fnK-KIB3H44"} 
              target="_blank" 
              onClick={playClick} 
              onMouseEnter={playHover}
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
            >
              {dict?.linkText || "Watch video →"}
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