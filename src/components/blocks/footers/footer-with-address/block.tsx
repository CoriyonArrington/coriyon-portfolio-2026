'use client'

import { useState } from 'react'
import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar, SimpleGrid, Separator } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube, LuCopy, LuCheck } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/blocks/marketing-navbars/navbar-island/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import NextLink from 'next/link'
import { SoundToggle } from '../../marketing-navbars/navbar-island/sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface FooterProps {
  dict?: any;
}

export const Block = ({ dict }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { playHover, playWhoosh, playClick } = useUiSounds()
  const [hasCopied, setHasCopied] = useState(false)

  const emailAddress = "coriyonarrington@gmail.com"

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playWhoosh()

    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const element = document.getElementById(targetId)
      
      if (element) {
        const offset = 120 
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        window.history.pushState(null, '', href)
      }
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    playClick()
    if (window.location.pathname === '/' || window.location.pathname.match(/^\/[a-z]{2}(-[A-Z]{2})?$/)) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  return (
    <Box as="footer" bg="bg.panel" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl" textStyle="sm">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '8', md: '12' }}
          justify="space-between"
          py={{ base: '10', md: '12' }}
        >
          {/* Left Side: Logo & Address/Contact */}
          <Stack alignItems="start" gap="8">
            <ChakraLink 
              href="#" 
              variant="plain" 
              _hover={{ textDecoration: "none" }}
              onClick={scrollToTop}
              onMouseEnter={playHover}
            >
              <HStack gap="3">
                <Avatar.Root size="sm">
                  <Avatar.Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png" alt="Coriyon Arrington" />
                  <Avatar.Fallback name="Coriyon Arrington" />
                </Avatar.Root>
                <Text fontWeight="bold" fontSize="xl" color="fg" letterSpacing="tight">
                  {dict?.logo || "Coriyon"}
                </Text>
              </HStack>
            </ChakraLink>

            <Stack gap="5">
              <Stack gap="1">
                <Text fontWeight="medium" color="fg">{dict?.location || "Location"}</Text>
                <Text color="fg.muted">Minneapolis, MN</Text>
              </Stack>
              <Stack gap="1">
                <Text fontWeight="medium" color="fg">{dict?.contactHeading || "Contact"}</Text>
                <Stack gap="0" alignItems="flex-start">
                  <HStack 
                    as="button"
                    onClick={handleCopyEmail}
                    color={hasCopied ? "green.500" : "fg.muted"}
                    _hover={{ color: hasCopied ? "green.600" : "fg" }}
                    onMouseEnter={playHover}
                    transition="all 0.2s"
                    cursor="pointer"
                    gap="2"
                  >
                    <Text>{hasCopied ? (dict?.emailCopied || "Email copied!") : emailAddress}</Text>
                    {hasCopied ? <LuCheck size="16" /> : <LuCopy size="16" />}
                  </HStack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Right Side: 2-Column Links Grid */}
          <SimpleGrid columns={2} gap="8" width={{ base: 'full', md: 'auto' }}>
            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.sitemap || "Sitemap"}</Text>
              <Stack gap="3" alignItems="start">
                <ChakraLink href="#projects" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#projects')} onMouseEnter={playHover}>
                  {dict?.projects || "Projects"}
                </ChakraLink>
                <ChakraLink href="#services" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#services')} onMouseEnter={playHover}>
                  {dict?.services || "Services"}
                </ChakraLink>
                <ChakraLink href="#about" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#about')} onMouseEnter={playHover}>
                  {dict?.about || "About"}
                </ChakraLink>
                <ChakraLink href="#process" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#process')} onMouseEnter={playHover}>
                  {dict?.process || "Process"}
                </ChakraLink>
              </Stack>
            </Stack>

            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.moreLinks || "More"}</Text>
              <Stack gap="3" alignItems="start">
                <ChakraLink href="#blog" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#blog')} onMouseEnter={playHover}>
                  {dict?.blog || "Blog"}
                </ChakraLink>
                <ChakraLink href="#testimonials" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#testimonials')} onMouseEnter={playHover}>
                  {dict?.testimonials || "Testimonials"}
                </ChakraLink>
                <ChakraLink href="#faqs" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#faqs')} onMouseEnter={playHover}>
                  {dict?.faqs || "FAQs"}
                </ChakraLink>
                <ChakraLink href="#contact" color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, '#contact')} onMouseEnter={playHover}>
                  {dict?.contact || "Contact"}
                </ChakraLink>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Stack>

        <Separator borderColor="border.subtle" />

        {/* Bottom Row */}
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems="center"
          justify="space-between"
          pt="6"
          pb={{ base: '28', md: '20' }} // Added extra bottom padding to account for the fixed banner
          gap={{ base: '6', lg: '8' }}
        >
          {/* Copyright */}
          <Box flex={{ lg: 1 }} textAlign={{ base: "center", lg: "left" }} w="full">
            <Text fontSize="sm" color="fg.subtle">
              © {currentYear} Coriyon Arrington. {dict?.rights || "All rights reserved."}
            </Text>
          </Box>

          {/* Built With Love */}
          <Box flex={{ lg: 1 }} textAlign="center" w="full">
            <Text fontSize="sm" color="fg.subtle" fontWeight="medium">
              Designed with intention. Built with love 💚
            </Text>
          </Box>

          {/* Socials & Toggles */}
          <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '6' }} alignItems="center" flex={{ lg: 1 }} justify={{ lg: "flex-end" }} w="full">
            <HStack gap="2">
              <IconButton variant="ghost" size="sm" aria-label="LinkedIn" asChild onMouseEnter={playHover} onClick={playClick}>
                <NextLink href="https://linkedin.com/in/coriyon" target="_blank">
                  <LuLinkedin />
                </NextLink>
              </IconButton>
              <IconButton variant="ghost" size="sm" aria-label="GitHub" asChild onMouseEnter={playHover} onClick={playClick}>
                <NextLink href="https://github.com/CoriyonArrington" target="_blank">
                  <LuGithub />
                </NextLink>
              </IconButton>
              <IconButton variant="ghost" size="sm" aria-label="YouTube" asChild onMouseEnter={playHover} onClick={playClick}>
                <NextLink href="https://www.youtube.com/@uxcoriyon" target="_blank">
                  <LuYoutube />
                </NextLink>
              </IconButton>
            </HStack>
            
            {/* Utility Toggles */}
            <HStack gap="1" borderLeftWidth={{ md: "1px" }} borderColor="border.subtle" ps={{ md: "4" }}>
              <SoundToggle />
              <ColorModeButton />
              <LanguageSwitcher />
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}