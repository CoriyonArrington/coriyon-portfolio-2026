'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, IconButton } from '@chakra-ui/react'
import { LuMessageSquare, LuX } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'

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
      <Box
        position="fixed"
        bottom={{ base: 0, md: '100px' }}
        right={{ base: 0, md: '8' }}
        w={{ base: '100vw', md: '450px' }}
        h={{ base: '100dvh', md: '750px' }}
        maxH={{ base: '100dvh', md: 'calc(100vh - 120px)' }}
        bg="white"
        _dark={{ bg: "gray.900" }}
        rounded={{ base: 'none', md: '2xl' }}
        shadow="2xl"
        zIndex="2100"
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
        <IconButton
          aria-label="Close chat"
          variant="outline"
          bg="white"
          _dark={{ bg: 'gray.800' }}
          color="fg.default"
          rounded="full"
          size="sm"
          position="absolute"
          top={{ base: '8', md: '8' }}
          right={{ base: '6', md: '8' }}
          zIndex="2102"
          onClick={toggleChat}
          shadow="sm"
          borderWidth="1px"
          borderColor="border.subtle"
          _hover={{ bg: 'gray.50', _dark: { bg: 'gray.700' }, transform: 'scale(1.05)' }}
          transition="all 0.2s"
        >
          <LuX size="20px" />
        </IconButton>

        <Box flex="1" overflow="hidden" position="relative" w="full" h="full">
          <AIChatBlock locale={locale} />
        </Box>
      </Box>

      <Box 
        position="fixed" 
        // FIX: Adjusted bottom value on mobile from '16' to '6' to perfectly match the Case Study Nav's vertical alignment
        bottom={{ base: '6', md: '8' }} 
        right={{ base: '4', md: '8' }} 
        zIndex={isOpen ? "2099" : "2101"} 
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
          w="64px"
          h="64px"
        >
          {isOpen ? <LuX size="28px" /> : <LuMessageSquare size="28px" />}
        </IconButton>
      </Box>
    </>
  )
}