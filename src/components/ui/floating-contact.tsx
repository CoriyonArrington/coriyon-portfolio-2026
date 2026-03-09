'use client'

import { useState, useEffect } from 'react'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, IconButton, Flex } from '@chakra-ui/react'
import { LuMessageSquare, LuX } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'

import { Block as AIChatBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'

export function FloatingContact() {
  const { playClick, playHover } = useUiSounds()
  const params = useParams()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locale = (params?.locale as string) || 'en'

  const [isOpen, setIsOpen] = useState(false)

  // Automatically close the chat whenever the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

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
        _dark={{ bg: "black" }} 
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
        {/* FIX: Increased pt to 16 (64px) so the top of the button matches the top bounding box of the header text exactly */}
        <Flex 
          position="absolute" 
          top="0" 
          left="0" 
          right="0" 
          justify="flex-end" 
          pr={{ base: "6", md: "8" }}
          pt={{ base: "16", md: "16" }} 
          zIndex="2102" 
          pointerEvents="none"
        >
          <IconButton
            aria-label="Close chat"
            variant="outline"
            bg="white"
            _dark={{ bg: 'black' }}
            color="fg.default"
            rounded="full"
            size="sm"
            pointerEvents="auto"
            onClick={toggleChat}
            shadow="sm"
            borderWidth="1px"
            borderColor="border.subtle"
            _hover={{ bg: 'gray.50', _dark: { bg: 'gray.800' }, transform: 'scale(1.05)' }}
            transition="all 0.2s"
          >
            <LuX size="20px" />
          </IconButton>
        </Flex>

        <Box flex="1" overflow="hidden" position="relative" w="full" h="full" pt="8">
          <AIChatBlock locale={locale} />
        </Box>
      </Box>

      <Box 
        position="fixed" 
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