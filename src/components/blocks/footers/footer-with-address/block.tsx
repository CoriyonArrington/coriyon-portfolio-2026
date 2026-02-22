'use client'

import { useState } from 'react'
import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar, SimpleGrid, Separator } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube, LuCopy, LuCheck, LuDownload } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/blocks/marketing-navbars/navbar-island/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { SoundToggle } from '../../marketing-navbars/navbar-island/sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'

interface FooterProps {
  dict?: any;
}

export const Block = ({ dict }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { playHover, playWhoosh, playClick, playSuccess } = useUiSounds()
  const [hasCopied, setHasCopied] = useState(false)
  const pathname = usePathname() || ''

  const emailAddress = "coriyonarrington@gmail.com"

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  // Determine if we are on the home page and get the base path (handles locales like /en, /es)
  const segments = pathname.split('/').filter(Boolean)
  const isHome = segments.length === 0 || (segments.length === 1 && segments[0].length === 2)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  // Dynamic href generator: uses just the hash on the home page, or appends the root path on subpages
  const getHref = (hash: string) => isHome ? hash : `${homePath}${hash}`

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    playWhoosh()

    // Only intercept and smooth scroll if it's a direct hash link (meaning we are on the home page)
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

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    playClick()
    // If we are already on the home page, smoothly scroll to top
    if (isHome) {
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
              asChild
              variant="plain" 
              _hover={{ textDecoration: "none" }}
              onClick={scrollToTop}
              onMouseEnter={playHover}
            >
              <NextLink href={homePath}>
                <HStack gap="3">
                  <Avatar.Root size="sm">
                    <Avatar.Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/avatars/coriyon-arrington.png" alt="Coriyon Arrington" />
                    <Avatar.Fallback name="Coriyon Arrington" />
                  </Avatar.Root>
                  <Text fontWeight="bold" fontSize="xl" color="fg" letterSpacing="tight">
                    {dict?.logo || "Coriyon"}
                  </Text>
                </HStack>
              </NextLink>
            </ChakraLink>

            <Stack gap="5">
              <Stack gap="1">
                <Text fontWeight="medium" color="fg">{dict?.location || "Location"}</Text>
                <Text color="fg.muted">Minneapolis, MN</Text>
              </Stack>
              <Stack gap="1">
                <Text fontWeight="medium" color="fg">{dict?.contactHeading || "Contact"}</Text>
                {/* Wrapped the links in a stack with gap="2" for nice spacing */}
                <Stack gap="2" alignItems="flex-start">
                  
                  {/* Email Copy Link */}
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
                    {/* Replaced the raw email address with "Copy Email" text */}
                    <Text>{hasCopied ? (dict?.emailCopied || "Email copied!") : (dict?.copyEmail || "Copy Email")}</Text>
                    {hasCopied ? <LuCheck size="16" /> : <LuCopy size="16" />}
                  </HStack>

                  {/* Seamless Resume Download Link */}
                  <DownloadTrigger 
                    value="/Resume-Coriyon Arrington-Senior Product Designer.pdf"
                    fileName="Coriyon_Arrington_Resume.pdf"
                  >
                    <HStack 
                      as="button"
                      color="fg.muted"
                      _hover={{ color: "fg" }}
                      onClick={playSuccess}
                      onMouseEnter={playHover}
                      transition="all 0.2s"
                      cursor="pointer"
                      gap="2"
                    >
                      <Text>{dict?.downloadResume || "Download Resume"}</Text>
                      <LuDownload size="16" />
                    </HStack>
                  </DownloadTrigger>

                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Right Side: 2-Column Links Grid */}
          <SimpleGrid columns={2} gap="8" width={{ base: 'full', md: 'auto' }}>
            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.sitemap || "Sitemap"}</Text>
              <Stack gap="3" alignItems="start">
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#projects'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#projects')}>{dict?.projects || "Projects"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#services'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#services')}>{dict?.services || "Services"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#about'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#about')}>{dict?.about || "About"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#process'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#process')}>{dict?.process || "Process"}</NextLink>
                </ChakraLink>
              </Stack>
            </Stack>

            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.moreLinks || "More"}</Text>
              <Stack gap="3" alignItems="start">
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#blog'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#blog')}>{dict?.blog || "Blog"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#testimonials'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#testimonials')}>{dict?.testimonials || "Testimonials"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#faqs'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#faqs')}>{dict?.faqs || "FAQs"}</NextLink>
                </ChakraLink>
                <ChakraLink asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, getHref('#contact'))} onMouseEnter={playHover}>
                  <NextLink href={getHref('#contact')}>{dict?.contact || "Contact"}</NextLink>
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
          pb={{ base: '28', md: '20' }} 
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