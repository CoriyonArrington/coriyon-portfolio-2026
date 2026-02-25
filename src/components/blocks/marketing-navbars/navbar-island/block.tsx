'use client'

import {
  Button,
  Center,
  Container,
  HStack,
  Spacer,
  Box,
  Drawer,
  IconButton,
  Flex
} from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode"
import { LuCalendar, LuMenu, LuX } from 'react-icons/lu'
import { useState } from 'react'
import { Logo } from './logo'
import { NavbarLinks } from './navbar-links'
import { LanguageSwitcher } from './language-switcher'
import { SoundToggle } from './sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { CalendlyPopup } from '@/components/ui/calendly-popup'

interface NavbarBlockProps {
  dict?: any; // Accepting the full localized dictionary for dynamic mapping
}

export const Block = ({ dict }: NavbarBlockProps) => {
  const { playHover, playClick } = useUiSounds()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = (e: React.MouseEvent) => {
    playClick()
    e.preventDefault()
    setIsCalendlyOpen(true)
  }

  // Updated to use 'cta' key from Supabase JSON
  const bookCallText = dict?.cta || "Book an intro call"

  const handleOpenDrawer = () => {
    playClick()
    setDrawerOpen(true)
  }

  return (
    <>
      <Box 
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        height="24px" 
        bg="bg.canvas/40" 
        backdropFilter="blur(4px)" 
        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)' }} 
        zIndex={99} 
        pointerEvents="none" 
      />
      <Box position="fixed" bottom="0" left="0" right="0" height="24px" bg="bg.canvas/40" backdropFilter="blur(4px)" style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)' }} zIndex={99} pointerEvents="none" />

      <CalendlyPopup 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />

      <Center 
        position="fixed" 
        zIndex={100} 
        top="4" 
        left="4" 
        right="4"
      >
        <Container
          bg="bg.panel/60" 
          backdropFilter="blur(24px) saturate(180%)"
          borderRadius="l3"
          boxShadow="sm"
          maxW={{ base: 'full', md: 'fit-content' }}
          px="4"
          py="3"
          border="1px solid"
          borderColor="border.subtle"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" // <-- Smooth animation for language switch
        >
          <HStack gap={{ base: '3', md: '8' }} w="full">
            <Logo />
            
            <Spacer hideFrom="md" />
            
            <NavbarLinks dict={dict} hideBelow="md" />
            
            <HStack gap="1" hideBelow="md">
              <SoundToggle />
              <ColorModeButton />
              <LanguageSwitcher />
            </HStack>
            
            <Button hideBelow="md" size="md" onClick={openCalendly} onMouseEnter={playHover}>
              {bookCallText} <LuCalendar />
            </Button>
            
            <IconButton 
              aria-label="Open Menu" 
              variant="ghost" 
              size="md" 
              hideFrom="md" 
              onClick={handleOpenDrawer} 
              onMouseEnter={playHover}
            >
              <LuMenu />
            </IconButton>
          </HStack>
        </Container>
      </Center>

      <Drawer.Root 
        open={drawerOpen} 
        onOpenChange={(e) => setDrawerOpen(e.open)}
        placement="end"
        size="full" 
      >
        <Drawer.Positioner zIndex={1001}>
          <Drawer.Content bg="bg.panel" boxShadow="none">
            <Drawer.Header p="0" pt="7" px="8">
              <Flex justify="space-between" align="center" w="full">
                <Logo />
                <Drawer.CloseTrigger asChild>
                  <IconButton 
                    position="relative" 
                    inset="auto"
                    variant="subtle"
                    bg="bg.muted"
                    colorPalette="gray"
                    size="md" 
                    borderRadius="md"
                    onClick={() => { playClick(); setDrawerOpen(false); }} 
                    onMouseEnter={playHover}
                  >
                    <LuX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>
            <Drawer.Body pt="8" px="8">
              <NavbarLinks dict={dict} direction="column" gap="6" alignItems="flex-start" fontSize="lg" onLinkClick={() => setDrawerOpen(false)} />
              
              <Box mt="8" pt="8" borderTopWidth="1px" borderColor="border.subtle">
                <HStack gap="2" mb="6">
                  <SoundToggle />
                  <ColorModeButton />
                  <LanguageSwitcher />
                </HStack>
                
                <Button 
                  w="full" 
                  size="lg" 
                  onClick={(e) => {
                    setDrawerOpen(false)
                    openCalendly(e)
                  }} 
                  onMouseEnter={playHover}
                >
                  {bookCallText} <LuCalendar />
                </Button>
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  )
}