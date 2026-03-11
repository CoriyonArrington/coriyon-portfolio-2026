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
  Flex,
  Link
} from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode"
import { LuCalendar, LuMenu, LuX, LuLinkedin, LuGithub, LuYoutube, LuInstagram } from 'react-icons/lu'
import { useState } from 'react'
import { Logo } from './logo'
import { NavbarLinks } from './navbar-links'
import { LanguageSwitcher } from './language-switcher'
import { SoundToggle } from './sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { CalendlyPopup } from '@/components/ui/calendly-popup'
import NextLink from 'next/link'

interface NavLink {
  id: string;
  slug: string;
  nav_title: string;
  page_type?: string; 
}

interface NavbarBlockProps {
  dict?: any; 
  links: NavLink[]; 
}

export const Block = ({ dict, links }: NavbarBlockProps) => {
  const { playHover, playClick } = useUiSounds()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = (e: React.MouseEvent) => {
    playClick()
    e.preventDefault()
    setIsCalendlyOpen(true)
  }

  const socialLinks = [
    { icon: <LuLinkedin />, href: "https://www.linkedin.com/in/coriyonarrington", label: "LinkedIn" },
    { icon: <LuGithub />, href: "https://github.com/coriyon", label: "GitHub" },
    { icon: <LuYoutube />, href: "https://www.youtube.com/@uxcoriyon", label: "YouTube" },
    { icon: <LuInstagram />, href: "https://www.instagram.com/uxcoriyon", label: "Instagram" },
  ]

  const bookCallText = dict?.cta || "Book an intro call"

  return (
    <>
      <Box 
        position="fixed" top="0" left="0" right="0" height="96px" bg="bg.canvas/30" backdropFilter="blur(4px)" 
        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }} 
        zIndex={99} pointerEvents="none" 
      />
      
      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />

      <Center position="fixed" zIndex={100} top="6" left="4" right="4">
        <Container
          bg="bg.panel/60" backdropFilter="blur(24px) saturate(180%)" borderRadius="l3" boxShadow="sm"
          maxW={{ base: 'full', md: 'fit-content' }} px="4" py="3" border="1px solid" borderColor="border.subtle"
        >
          <HStack gap={{ base: '3', md: '8' }} w="full">
            <Logo />
            <Spacer hideFrom="md" />
            <NavbarLinks links={links} hideBelow="md" isMobile={false} />
            <HStack gap="1" hideBelow="md">
              <SoundToggle />
              <ColorModeButton />
              <LanguageSwitcher />
            </HStack>
            <Button hideBelow="md" size="md" onClick={openCalendly} onMouseEnter={playHover}>
              {bookCallText} <LuCalendar />
            </Button>
            <IconButton aria-label="Open Menu" variant="ghost" size="md" hideFrom="md" onClick={() => { playClick(); setDrawerOpen(true); }} onMouseEnter={playHover}>
              <LuMenu />
            </IconButton>
          </HStack>
        </Container>
      </Center>

      <Drawer.Root open={drawerOpen} onOpenChange={(e) => setDrawerOpen(e.open)} placement="end" size="full">
        <Drawer.Positioner zIndex={1001}>
          <Drawer.Content bg="bg.panel" boxShadow="none">
            <Drawer.Header p="0" pt="7" px="8">
              <Flex justify="space-between" align="center" w="full">
                <Logo />
                <Drawer.CloseTrigger asChild>
                  <IconButton variant="subtle" bg="bg.muted" colorPalette="gray" size="md" borderRadius="md" onClick={() => { playClick(); setDrawerOpen(false); }}>
                    <LuX />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Flex>
            </Drawer.Header>
            <Drawer.Body pt="10" px="8" display="flex" flexDirection="column" alignItems="center">
              <NavbarLinks links={links} isMobile={true} onLinkClick={() => setDrawerOpen(false)} w="full" alignItems="center" />
              
              <Box mt="12" pt="8" borderTopWidth="1px" borderColor="border.subtle" w="full" display="flex" flexDirection="column" alignItems="center">
                <HStack gap="6" mb="8" px="1" justify="center" w="full">
                  {socialLinks.map((social, idx) => (
                    <IconButton key={idx} variant="ghost" size="md" aria-label={social.label} asChild onMouseEnter={playHover} onClick={playClick}>
                      <NextLink href={social.href} target="_blank">
                        {social.icon}
                      </NextLink>
                    </IconButton>
                  ))}
                </HStack>

                <HStack gap="3" mb="8" justify="center" w="full">
                  <SoundToggle />
                  <ColorModeButton />
                  <LanguageSwitcher />
                </HStack>
                
                <Button w="full" size="xl" h="16" onClick={(e) => { setDrawerOpen(false); openCalendly(e); }}>
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