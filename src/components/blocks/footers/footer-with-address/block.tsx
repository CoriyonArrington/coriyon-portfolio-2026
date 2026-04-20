'use client'

import { useState, useEffect } from 'react'
import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar, Flex, Separator, SimpleGrid } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube, LuCopy, LuCheck, LuPhone } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import { ColorPaletteToggle } from '@/components/ui/color-palette-toggle'
import NextLink from 'next/link'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { SoundToggle } from '@/components/ui/sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface FooterProps {
  dict?: any;
  pages?: any[];
}

export const Block = ({ dict, pages = [] }: FooterProps) => {
  const { playHover, playWhoosh, playClick } = useUiSounds()
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)
  const pathname = usePathname() || ''
  const router = useRouter()
  const params = useParams()
  const [year, setYear] = useState<number | null>(null) 

  const currentLocale = (params?.locale as string) || 'en'

  // --- DYNAMIC CONTACT INFO EXTRACTION ---
  const contactInfo = dict?.contact_info || {}

  const emailAddress = contactInfo.email || "hi@coriyon.com"
  const phoneNumber = contactInfo.phone || "(612) 217-4482"
  const rawPhoneNumber = phoneNumber.replace(/[^0-9+]/g, '')
  
  // Use strict undefined checks so empty strings from the DB are respected
  const addressLine1 = contactInfo.address !== undefined ? contactInfo.address : "Minneapolis, MN"
  const addressLine2 = contactInfo.city_state_zip !== undefined ? contactInfo.city_state_zip : ""
  const mapUrl = contactInfo.map_url !== undefined ? contactInfo.map_url : ""
  // ---------------------------------------

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const mainMenuPages = pages.filter(p => p.page_type === 'MAIN_MENU' || p.page_type === 'STANDARD')
  const explorePages = pages.filter(p => p.page_type === 'EXPLORE')
  const resourcesPages = pages.filter(p => p.page_type === 'RESOURCES')
  const supportPages = pages.filter(p => p.page_type === 'SUPPORT')
  const legalPages = pages.filter(p => p.page_type === 'LEGAL')

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopiedEmail(true)
    setTimeout(() => setHasCopiedEmail(false), 2000)
  }

  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const getHref = (slug: string) => {
    if (!slug) return homePath;
    if (slug === 'home' || slug === '/') return homePath;
    
    if (slug.startsWith('#')) {
      return homePath === '/' ? `/${slug}` : `${homePath}${slug}`; 
    }
    
    if (slug.includes('#')) {
      const [pagePart, hashPart] = slug.split('#');
      const cleanPage = pagePart.startsWith('/') ? pagePart : `/${pagePart}`;
      const base = homePath === '/' ? cleanPage : `${homePath}${cleanPage}`;
      return `${base}#${hashPart}`; 
    }

    const cleanPath = slug.startsWith('/') ? slug : `/${slug}`;
    return homePath === '/' ? cleanPath : `${homePath}${cleanPath}`;
  }

  const checkIsSamePage = (href: string) => {
    const basePath = href.split('#')[0]
    const normalizePath = (p: string) => (p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/'))
    return normalizePath(basePath) === normalizePath(pathname)
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (!href.includes('#')) {
      playWhoosh();
      return;
    }
    
    const hashPart = href.split('#')[1]
    
    if (hashPart && checkIsSamePage(href)) {
      e.preventDefault()
      playWhoosh()
      
      const element = document.getElementById(hashPart)
      if (element) {
        router.push(`${pathname}#${hashPart}`, { scroll: false })
        window.dispatchEvent(new Event('app-hash-change')) 
        
        setTimeout(() => {
          const offset = 120 
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset
          
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }, 10)
      }
    } else {
      playWhoosh()
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    playClick()
    e.preventDefault()
    
    router.push(pathname, { scroll: false })
    window.dispatchEvent(new Event('app-hash-change')) 

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 10)
  }

  const getLocalizedTitle = (page: any) => {
    let title = page[`nav_title_${currentLocale}`] || page[`title_${currentLocale}`] || page.nav_title || page.title || '';
    if (currentLocale === 'es' && !page[`nav_title_es`]) {
      const esFallbacks: Record<string, string> = {
        'home': 'Inicio',
        'projects': 'Trabajo',
        'services': 'Servicios',
        'about': 'Nosotros',
        'contact': 'Contacto',
        'playground': 'Laboratorio',
        'privacy': 'Política de Privacidad',
        'terms-of-service': 'Términos de Servicio',
        'refund-policy': 'Política de Reembolso',
        'security-policy': 'Política de Seguridad',
        'accessibility-statement': 'Declaración de Accesibilidad'
      };
      const cleanSlug = (page.slug || '').replace(/^\/|\/$/g, '');
      if (esFallbacks[cleanSlug]) title = esFallbacks[cleanSlug];
    }
    return title;
  }

  return (
    <Box as="footer" bg="bg.panel" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl" textStyle="sm">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '12', lg: '16' }}
          justify="space-between"
          py={{ base: '12', md: '16' }}
        >
          <Stack alignItems="start" gap="8" flex="1" maxW={{ lg: "sm" }}>
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
                    {dict?.logo || "Coriyon Arrington"}
                  </Text>
                </HStack>
              </NextLink>
            </ChakraLink>

            <Box textAlign="left" w="full">
              <Text fontSize="sm" color="fg.muted" lineHeight="relaxed">
                <Text as="span" fontWeight="bold" color="fg">{dict?.disclaimerLabel || "Disclaimer:"} </Text>
                {dict?.clarityDisclosure || "I partner with Microsoft Clarity to capture how you use and interact with my website through behavioral metrics, heatmaps, and session replay to improve the user experience. By using this site, you agree that we and Microsoft can collect and use this data. "}
                <ChakraLink asChild color="fg" textDecoration="underline" _hover={{ color: "colorPalette.600" }}>
                  <a href="https://privacy.microsoft.com/en-US/privacystatement" target="_blank" rel="noopener noreferrer">
                    {dict?.microsoftPrivacy || "Microsoft Privacy Statement"}
                  </a>
                </ChakraLink>.
              </Text>
            </Box>
          </Stack>

          <Flex flex="2" justifyContent={{ base: "flex-start", lg: "flex-end" }} w="full">
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "10", lg: "12" }} w={{ base: "full", lg: "auto" }}>
              
              {mainMenuPages.length > 0 && (
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg">{dict?.mainMenu || "Main Menu"}</Text>
                  <Stack gap="3" alignItems="start">
                    {mainMenuPages.map((page) => {
                      const href = getHref(page.slug);
                      const label = getLocalizedTitle(page);
                      
                      return (
                        <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                          <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                        </ChakraLink>
                      )
                    })}
                  </Stack>
                </Stack>
              )}

              {explorePages.length > 0 && (
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg">{dict?.explore || "Explore"}</Text>
                  <Stack gap="3" alignItems="start">
                    {explorePages.map((page) => {
                      const href = getHref(page.slug);
                      const label = getLocalizedTitle(page);

                      return (
                        <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                          <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                        </ChakraLink>
                      )
                    })}
                  </Stack>
                </Stack>
              )}

              {resourcesPages.length > 0 && (
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg">{dict?.resources || "Resources"}</Text>
                  <Stack gap="3" alignItems="start">
                    {resourcesPages.map((page) => {
                      const href = getHref(page.slug);
                      const label = getLocalizedTitle(page);

                      return (
                        <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                          <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                        </ChakraLink>
                      )
                    })}
                  </Stack>
                </Stack>
              )}

              {supportPages.length > 0 && (
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg">{dict?.support || "Support"}</Text>
                  <Stack gap="3" alignItems="start">
                    {supportPages.map((page) => {
                      const href = getHref(page.slug);
                      const label = getLocalizedTitle(page);

                      return (
                        <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                          <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                        </ChakraLink>
                      )
                    })}
                  </Stack>
                </Stack>
              )}

              {legalPages.length > 0 && (
                <Stack gap="4">
                  <Text fontWeight="medium" color="fg">{dict?.legal || "Legal"}</Text>
                  <Stack gap="3" alignItems="start">
                    {legalPages.map((page) => {
                      const href = getHref(page.slug);
                      const label = getLocalizedTitle(page);

                      return (
                        <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                          <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                        </ChakraLink>
                      )
                    })}
                  </Stack>
                </Stack>
              )}

              <Stack gap="4" maxW="xs">
                <Text fontWeight="medium" color="fg">{dict?.location || "Location"}</Text>
                <Stack gap="3" alignItems="start">
                  {mapUrl ? (
                    <Text 
                      asChild
                      color="fg.muted"
                      _hover={{ color: "fg" }}
                      whiteSpace="normal"
                      lineHeight="tall"
                      display="inline-block"
                      transition="all 0.2s"
                    >
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={playHover}>
                        {addressLine1}{addressLine2 && <><br/>{addressLine2}</>}
                      </a>
                    </Text>
                  ) : (
                    <Text 
                      color="fg.muted"
                      whiteSpace="normal"
                      lineHeight="tall"
                      display="inline-block"
                    >
                      {addressLine1}{addressLine2 && <><br/>{addressLine2}</>}
                    </Text>
                  )}
                </Stack>
              </Stack>

              <Stack gap="4">
                <Text fontWeight="medium" color="fg">{dict?.contactHeading || "Contact"}</Text>
                <Stack gap="3" alignItems="flex-start">
                  <HStack 
                    as="button"
                    onClick={handleCopyEmail}
                    color={hasCopiedEmail ? "colorPalette.600" : "fg.muted"}
                    _hover={{ color: hasCopiedEmail ? "colorPalette.700" : "fg" }}
                    onMouseEnter={playHover}
                    transition="all 0.2s"
                    cursor="pointer"
                    gap="2"
                  >
                    <Text>{hasCopiedEmail ? (dict?.emailCopied || "Email copied!") : emailAddress}</Text>
                    {hasCopiedEmail ? <LuCheck size="16" /> : <LuCopy size="16" />}
                  </HStack>

                  <HStack 
                    asChild
                    color="fg.muted"
                    _hover={{ color: "fg" }}
                    transition="all 0.2s"
                    gap="2"
                  >
                    <a href={`tel:${rawPhoneNumber}`} onMouseEnter={playHover} onClick={playClick}>
                      <Text>{phoneNumber}</Text>
                      <LuPhone size="16" />
                    </a>
                  </HStack>

                  {contactInfo.linkedin && (
                    <HStack asChild color="fg.muted" _hover={{ color: "fg" }} transition="all 0.2s" gap="2">
                      <NextLink href={contactInfo.linkedin} target="_blank" onMouseEnter={playHover} onClick={playClick}>
                        <Text>LinkedIn</Text>
                        <LuLinkedin size="16" />
                      </NextLink>
                    </HStack>
                  )}

                  {contactInfo.github && (
                    <HStack asChild color="fg.muted" _hover={{ color: "fg" }} transition="all 0.2s" gap="2">
                      <NextLink href={contactInfo.github} target="_blank" onMouseEnter={playHover} onClick={playClick}>
                        <Text>GitHub</Text>
                        <LuGithub size="16" />
                      </NextLink>
                    </HStack>
                  )}

                  {contactInfo.youtube && (
                    <HStack asChild color="fg.muted" _hover={{ color: "fg" }} transition="all 0.2s" gap="2">
                      <NextLink href={contactInfo.youtube} target="_blank" onMouseEnter={playHover} onClick={playClick}>
                        <Text>YouTube</Text>
                        <LuYoutube size="16" />
                      </NextLink>
                    </HStack>
                  )}

                </Stack>
              </Stack>

            </SimpleGrid>
          </Flex>
        </Flex>

        <Separator borderColor="border.subtle" />

        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems={{ base: "flex-start", lg: "center" }}
          justify="space-between"
          pt="6"
          pb={{ base: '28', md: '20' }}
          gap={{ base: '6', lg: '8' }}
        >
          <Stack gap="1" flex={{ lg: 1 }} textAlign="left" w="full">
            <Text fontSize="sm" color="fg.subtle">
              {dict?.builtWithLove || "Designed with intention. Built with love."}
            </Text>
            <Text fontSize="sm" color="fg.subtle">
              {dict?.copyright || `© ${year || 2026} Coriyon Arrington. Based in Minneapolis.`}
            </Text>
          </Stack>

          <Flex flex={{ lg: 1 }} justify={{ base: "flex-start", lg: "flex-end" }} w="full">
            <HStack gap="1">
              <SoundToggle />
              <ColorModeButton />
              <ColorPaletteToggle />
              <LanguageSwitcher />
            </HStack>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}