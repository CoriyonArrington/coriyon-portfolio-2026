'use client'

import { useState, useEffect } from 'react'
import { Box, IconButton, Button, HStack, Text, Stack } from '@chakra-ui/react'
import { LuMessageSquare, LuX, LuBot, LuCalendar } from 'react-icons/lu'
import { Block as AiBlock } from '@/components/blocks/ai/ai-prompt-with-action-02/block'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { CalendlyPopup } from './calendly-popup'
import { useParams } from 'next/navigation' // FIX: Imported useParams to detect the language

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const { playHover, playWhoosh, playClick } = useUiSounds()
  
  // FIX: Extract the current locale from the URL
  const params = useParams()
  const currentLocale = (params?.locale as string) || 'en'
  const isEs = currentLocale === 'es'

  // FIX: Setup translations for the FAB UI
  const t = {
    menuTitle: isEs ? "¿Cómo puedo ayudarte?" : "How can I help?",
    chatBtn: isEs ? "Chatear con mi IA" : "Chat with my AI",
    bookBtn: isEs ? "Reserva una llamada" : "Book an intro call",
    chatHeader: isEs ? "IA de Coriyon" : "Coriyon AI",
    chatSub: isEs ? "Pregúntame lo que sea sobre mi trabajo" : "Ask me anything about my work",
    closeAria: isEs ? "Cerrar menú" : "Close menu",
    openAria: isEs ? "Ponerse en contacto" : "Get in touch"
  }

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
        
        {/* The Action Menu */}
        {isOpen && !isChatOpen && (
          <Box mb="4" py="4" bg="bg.panel" rounded="2xl" shadow="2xl" borderWidth="1px" borderColor="border.subtle" minW="260px">
            <Text fontSize="sm" fontWeight="semibold" color="fg.muted" mb="3" px="4">{t.menuTitle}</Text>
            <Stack gap="2">
              <Button w="full" variant="ghost" justifyContent="flex-start" size="lg" gap="3" px="4" onClick={handleOpenChat} onMouseEnter={playHover}>
                <Box p="2" bg="colorPalette.subtle" color="colorPalette.600" rounded="lg">
                  <LuBot size="20" />
                </Box>
                {t.chatBtn}
              </Button>
              <Button w="full" variant="ghost" justifyContent="flex-start" size="lg" gap="3" px="4" onClick={handleOpenCalendly} onMouseEnter={playHover}>
                <Box p="2" bg="colorPalette.subtle" color="colorPalette.600" rounded="lg">
                  <LuCalendar size="20" />
                </Box>
                {t.bookBtn}
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
            w={{ base: "calc(100vw - 32px)", md: "480px" }}
            h={{ base: "600px", md: "700px" }}
            maxH="calc(100vh - 120px)"
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <HStack justify="space-between" align="center" p="4" borderBottomWidth="1px" borderColor="border.subtle" bg="bg.muted">
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" color="colorPalette.600" rounded="lg">
                  <LuBot size="20" />
                </Box>
                <Box>
                  <Text fontWeight="semibold" fontSize="sm">{t.chatHeader}</Text>
                  <Text fontSize="xs" color="fg.muted">{t.chatSub}</Text>
                </Box>
              </HStack>
              <IconButton aria-label="Close chat" variant="ghost" size="sm" rounded="full" onClick={handleCloseChat}>
                <LuX />
              </IconButton>
            </HStack>
            <Box flex="1" overflow="hidden" position="relative">
               {/* FIX: Passed the dynamic locale instead of hardcoded 'en' */}
               <AiBlock isHero={false} locale={currentLocale} dict={{}} />
            </Box>
          </Box>
        )}

        {/* The Floating Toggle Button */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            title={isOpen || isChatOpen ? t.closeAria : t.openAria}
            aria-label={isOpen || isChatOpen ? t.closeAria : t.openAria}
            size="2xl"
            rounded="full"
            colorPalette={isOpen || isChatOpen ? "gray" : undefined}
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