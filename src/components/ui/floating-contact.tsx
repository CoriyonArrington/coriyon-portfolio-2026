'use client'

import { useState, useEffect } from 'react'
import { Box, IconButton, Button, HStack, Text, Stack } from '@chakra-ui/react'
import { LuMessageSquare, LuX, LuBot, LuCalendar } from 'react-icons/lu'
import { Block as AiBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { CalendlyPopup } from './calendly-popup'

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const { playHover, playWhoosh, playClick } = useUiSounds()

  // Listen for the custom event to open the AI Chat
  useEffect(() => {
    const handleOpenAiChat = () => {
      setIsOpen(true)
      setIsChatOpen(true)
      playWhoosh()
    }
    window.addEventListener('open-ai-chat', handleOpenAiChat)
    return () => window.removeEventListener('open-ai-chat', handleOpenAiChat)
  }, [playWhoosh])

  const toggleMenu = () => {
    playWhoosh()
    setIsOpen(!isOpen)
    if (isOpen) setIsChatOpen(false) 
  }

  const handleOpenChat = () => {
    playClick()
    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    playWhoosh()
    setIsChatOpen(false)
    setIsOpen(false)
  }

  const handleOpenCalendly = () => {
    playClick()
    setIsOpen(false)
    setIsCalendlyOpen(true)
  }

  return (
    <>
      <Box position="fixed" bottom={{ base: "4", md: "8" }} right={{ base: "4", md: "8" }} zIndex="tooltip">
        
        {/* The Action Menu (Conditionally rendered to bypass missing Collapse snippet) */}
        {isOpen && !isChatOpen && (
          <Box mb="4" p="4" bg="bg.panel" rounded="2xl" shadow="2xl" borderWidth="1px" borderColor="border.subtle" minW="260px">
            <Text fontSize="sm" fontWeight="semibold" color="fg.muted" mb="3" px="2">How can I help?</Text>
            <Stack gap="2">
              <Button w="full" variant="ghost" justifyContent="flex-start" size="lg" gap="3" onClick={handleOpenChat} onMouseEnter={playHover}>
                <Box p="2" bg="green.500/10" color="green.500" rounded="lg">
                  <LuBot size="20" />
                </Box>
                Chat with my AI
              </Button>
              <Button w="full" variant="ghost" justifyContent="flex-start" size="lg" gap="3" onClick={handleOpenCalendly} onMouseEnter={playHover}>
                <Box p="2" bg="blue.500/10" color="blue.500" rounded="lg">
                  <LuCalendar size="20" />
                </Box>
                Book an intro call
              </Button>
            </Stack>
          </Box>
        )}

        {/* The AI Chat Widget */}
        {isChatOpen && (
          <Box 
            mb="4" 
            bg="bg.panel" 
            rounded="2xl" 
            shadow="2xl" 
            borderWidth="1px" 
            borderColor="border.subtle" 
            w={{ base: "calc(100vw - 32px)", md: "400px" }}
            h={{ base: "600px", md: "500px" }}
            maxH="calc(100vh - 120px)"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <HStack justify="space-between" align="center" p="4" borderBottomWidth="1px" borderColor="border.subtle" bg="bg.muted">
              <HStack gap="3">
                <Box p="2" bg="green.500/10" color="green.500" rounded="lg">
                  <LuBot size="20" />
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">Coriyon AI</Text>
                  <Text fontSize="xs" color="fg.muted">Ask me anything about my work</Text>
                </Box>
              </HStack>
              <IconButton aria-label="Close chat" variant="ghost" size="sm" rounded="full" onClick={handleCloseChat}>
                <LuX />
              </IconButton>
            </HStack>
            <Box flex="1" overflow="hidden" position="relative">
               <AiBlock isHero={false} locale="en" dict={{}} />
            </Box>
          </Box>
        )}

        {/* The Floating Toggle Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            title={isOpen || isChatOpen ? "Close menu" : "Get in touch"}
            aria-label="Contact options"
            size="2xl"
            rounded="full"
            colorPalette={isOpen || isChatOpen ? "gray" : "green"}
            shadow="xl"
            onClick={isOpen && isChatOpen ? handleCloseChat : toggleMenu}
            onMouseEnter={playHover}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            _active={{ transform: 'scale(0.95)' }}
          >
            {isOpen || isChatOpen ? <LuX size="24" /> : <LuMessageSquare size="24" />}
          </IconButton>
        </Box>
      </Box>

      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  )
}