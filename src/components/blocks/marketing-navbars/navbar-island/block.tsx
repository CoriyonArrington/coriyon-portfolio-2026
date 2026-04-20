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
  Text,
  Popover,
  Portal
} from '@chakra-ui/react'
import { ColorModeButton } from "@/components/ui/color-mode"
import { 
  LuCalendar, 
  LuMenu, 
  LuX, 
  LuLinkedin, 
  LuGithub, 
  LuYoutube, 
  LuInstagram, 
  LuSettings,
  LuChevronDown
} from 'react-icons/lu'
import { useState } from 'react'
import { NavbarLinks } from './navbar-links'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { ColorPaletteToggle } from '@/components/ui/color-palette-toggle'
import { useThemeColor } from '@/components/ui/provider'
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
  const { colorPalette } = useThemeColor()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openCalendly = (e: React.MouseEvent) => {
    playClick()
    e.preventDefault()
    setIsCalendlyOpen(true)
  }

  const socialLinks = [
    { icon: <LuLinkedin />, href: "https://www.linkedin.com/in/coriyon", label: "LinkedIn" },
    { icon: <LuGithub />, href: "https://github.com/CoriyonArrington", label: "GitHub" },
    { icon: <LuYoutube />, href: "https://www.youtube.com/@uxcoriyon", label: "YouTube" },
  ]

  const bookCallText = dict?.cta || "Book an intro call"
  const logoText = dict?.logoText || "Coriyon's Portfolio"

  const CustomTextLogo = () => (
    <NextLink href="/">
      <HStack gap="2" align="center" onClick={playClick} onMouseEnter={playHover} cursor="pointer">
        <Box boxSize="8" rounded="full" overflow="hidden" position="relative">
          <img 
            src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png" 
            alt="Coriyon Arrington" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </Box>
        <Text fontWeight="bold" fontSize="lg" letterSpacing="tight">
          {logoText}
        </Text>
      </HStack>
    </NextLink>
  )

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
            <CustomTextLogo />
            
            <Spacer hideFrom="md" />
            
            <NavbarLinks links={links} hideBelow="md" isMobile={false} />
            
            {/* Desktop Settings & CTA */}
            <HStack gap="2" hideBelow="md">
              
              <Popover.Root 
                open={settingsOpen}
                onOpenChange={(e) => setSettingsOpen(e.open)}
                positioning={{ placement: 'bottom-end', offset: { mainAxis: 16 } }}
              >
                <Popover.Trigger asChild>
                  <Button 
                    variant="ghost" 
                    size="md" 
                    px="3"
                    color={settingsOpen ? "colorPalette.500" : "fg.muted"}
                    bg={settingsOpen ? "bg.muted" : "transparent"}
                    _hover={{ color: "colorPalette.500", bg: "bg.muted" }}
                    aria-label="Preferences"
                    onMouseEnter={playHover}
                    onClick={playClick}
                  >
                    <LuSettings size="18" />
                    <LuChevronDown size="14" style={{ marginLeft: '4px' }} />
                  </Button>
                </Popover.Trigger>
                
                <Portal>
                  <Popover.Positioner zIndex={2000}>
                    <Popover.Content 
                      width="fit-content" 
                      p="2" 
                      borderRadius="xl" 
                      boxShadow="xl" 
                      bg="bg.panel"
                      borderWidth="1px"
                      borderColor="border.subtle"
                      outline="none"
                    >
                      <HStack gap="1" colorPalette={colorPalette} color="colorPalette.500">
                        <SoundToggle />
                        <ColorModeButton />
                        <ColorPaletteToggle />
                        <LanguageSwitcher />
                      </HStack>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>

              <Button size="md" onClick={openCalendly} onMouseEnter={playHover}>
                {bookCallText} <LuCalendar />
              </Button>
            </HStack>
            
            {/* Mobile Menu Trigger */}
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
                <CustomTextLogo />
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

                <HStack gap="3" mb="8" justify="center" w="full" colorPalette={colorPalette} color="colorPalette.500">
                  <SoundToggle />
                  <ColorModeButton />
                  <ColorPaletteToggle />
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