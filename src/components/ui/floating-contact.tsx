'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, IconButton } from '@chakra-ui/react'
import { LuMessageSquare, LuX } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'

// Import your newly polished AI Block!
import { Block as AIChatBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'

export function FloatingContact() {
  const { playClick, playHover } = useUiSounds()
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    playClick()
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* The Global Chat Widget Window */}
      <Box
        position="fixed"
        // FIX: Moved the widget window up to account for the bottom banner
        bottom={{ base: 0, md: '120px' }}
        right={{ base: 0, md: '8' }}
        w={{ base: '100vw', md: '450px' }}
        h={{ base: '100dvh', md: '750px' }}
        maxH={{ base: '100dvh', md: 'calc(100vh - 140px)' }}
        bg="white"
        _dark={{ bg: "gray.900" }}
        rounded={{ base: 'none', md: '2xl' }}
        shadow="2xl"
        zIndex="1400"
        borderWidth={{ base: 0, md: '1px' }}
        borderColor="border.subtle"
        overflow="hidden"
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? 'auto' : 'none'}
        transform={isOpen ? 'translateY(0)' : 'translateY(20px) scale(0.98)'}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        display="flex"
        flexDirection="column"
      >
        {/* Close Button Overlay */}
        <IconButton
          aria-label="Close chat"
          variant="ghost"
          bg="white"
          _dark={{ bg: "bg.panel" }}
          color="fg.default"
          rounded="full"
          size="sm"
          position="absolute"
          top={{ base: '4', md: '4' }}
          right={{ base: '4', md: '4' }}
          zIndex="2000"
          onClick={toggleChat}
          shadow="sm"
          borderWidth="1px"
          borderColor="border.subtle"
          _hover={{ bg: 'gray.100', _dark: { bg: 'bg.muted' }, transform: 'scale(1.05)' }}
          transition="all 0.2s"
        >
          <LuX />
        </IconButton>

        {/* The AI Block - Scales perfectly to fit the container */}
        <Box flex="1" overflow="hidden" position="relative" w="full" h="full">
          <AIChatBlock locale={locale} />
        </Box>
      </Box>

      {/* The Floating Action Button */}
      <Box 
        position="fixed" 
        // FIX: Elevated the FAB to avoid banner overlap
        bottom={{ base: '24', md: '28' }} 
        right={{ base: '4', md: '8' }} 
        zIndex={isOpen ? "1399" : "1401"} 
      >
        <IconButton
          aria-label={isOpen ? "Close Chat" : "Open Chat"}
          bg="green.600"
          color="white"
          rounded="full"
          shadow="xl"
          _hover={{ bg: 'green.700', transform: 'scale(1.05)', shadow: '2xl' }}
          transition="all 0.2s"
          onClick={toggleChat}
          onMouseEnter={playHover}
          w={{ base: '56px', md: '64px' }}
          h={{ base: '56px', md: '64px' }}
        >
          {isOpen ? <LuX size="24px" /> : <LuMessageSquare size="24px" />}
        </IconButton>
      </Box>
    </>
  )
}