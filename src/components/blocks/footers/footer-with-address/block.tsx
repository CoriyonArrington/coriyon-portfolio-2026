'use client'

import { useState, useEffect } from 'react'
import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar, SimpleGrid, Separator } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube, LuCopy, LuCheck, LuDownload } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/blocks/marketing-navbars/navbar-island/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SoundToggle } from '../../marketing-navbars/navbar-island/sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'

interface FooterProps {
  dict?: any;
  pages?: any[];
}

export const Block = ({ dict, pages = [] }: FooterProps) => {
  const { playHover, playWhoosh, playClick, playSuccess } = useUiSounds()
  const [hasCopied, setHasCopied] = useState(false)
  const pathname = usePathname() || ''
  const router = useRouter()
  const [year, setYear] = useState<number | null>(null) 

  const emailAddress = "coriyonarrington@gmail.com"

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const mainMenuPages = pages.filter(p => p.page_type === 'MAIN_MENU' || p.page_type === 'STANDARD')
  const explorePages = pages.filter(p => p.page_type === 'EXPLORE')

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
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

  // Ensures we only disable Next.js scroll if we are staying on the exact same page
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
        // Safely update Next router without reloading
        router.push(`${pathname}#${hashPart}`, { scroll: false })
        window.dispatchEvent(new Event('app-hash-change')) 
        
        // Custom 120px offset smooth scroll decoupled from router
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

  return (
    <Box as="footer" bg="bg.panel" borderTopWidth="1px" borderColor="border.subtle">
      <Container maxW="7xl" textStyle="sm">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '8', md: '12' }}
          justify="space-between"
          py={{ base: '10', md: '12' }}
        >
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
                <Stack gap="2" alignItems="flex-start">
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
                    <Text>{hasCopied ? (dict?.emailCopied || "Email copied!") : (dict?.copyEmail || "Copy Email")}</Text>
                    {hasCopied ? <LuCheck size="16" /> : <LuCopy size="16" />}
                  </HStack>

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

          <SimpleGrid columns={2} gap="8" width={{ base: 'full', md: 'auto' }}>
            
            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.mainMenu || "Main Menu"}</Text>
              <Stack gap="3" alignItems="start">
                {mainMenuPages.map((page) => {
                  const href = getHref(page.slug);
                  const dictKey = page.slug.includes('#') ? page.slug.split('#')[1] : page.slug;
                  const label = dict?.[`${dictKey}Link`] || page.nav_title || page.title;
                  
                  return (
                    <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                      {/* FIXED: Dynamic scroll prop */}
                      <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                    </ChakraLink>
                  )
                })}
              </Stack>
            </Stack>

            <Stack gap="4" minW={{ md: '40' }}>
              <Text fontWeight="medium" color="fg">{dict?.explore || "Explore"}</Text>
              <Stack gap="3" alignItems="start">
                {explorePages.map((page) => {
                  const href = getHref(page.slug);
                  const dictKey = page.slug.includes('#') ? page.slug.split('#')[1] : page.slug;
                  const label = dict?.[`${dictKey}Link`] || page.nav_title || page.title;

                  return (
                    <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                      {/* FIXED: Dynamic scroll prop */}
                      <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>{label}</NextLink>
                    </ChakraLink>
                  )
                })}
              </Stack>
            </Stack>

          </SimpleGrid>
        </Stack>

        <Separator borderColor="border.subtle" />

        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems="center"
          justify="space-between"
          pt="6"
          pb="4" 
          gap={{ base: '6', lg: '8' }}
        >
          <Box flex={{ lg: 1 }} textAlign="left" w="full">
            <Text fontSize="sm" color="fg.subtle">
              {dict?.copyright || `© ${year || 2026} Coriyon Arrington. Based in Minneapolis.`}
            </Text>
          </Box>

          <Box flex={{ lg: 1 }} textAlign={{ base: "left", lg: "center" }} w="full">
            <Text fontSize="sm" color="fg.subtle">
              {dict?.builtWithLove || "Designed with intention. Built with love 💚"}
            </Text>
          </Box>

          <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '6' }} alignItems={{ base: "flex-start", lg: "center" }} flex={{ lg: 1 }} justify={{ lg: "flex-end" }} w="full">
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
            
            <HStack gap="1" borderLeftWidth={{ md: "1px" }} borderColor="border.subtle" ps={{ md: "4" }}>
              <SoundToggle />
              <ColorModeButton />
              <LanguageSwitcher />
            </HStack>
          </Stack>
        </Stack>

        <Box pb={{ base: '28', md: '20' }} textAlign="left" w="full">
          <Text fontSize="sm" color="fg.subtle" maxW="4xl">
            {dict?.clarityDisclosure || "I partner with Microsoft Clarity to capture how you use and interact with my website through behavioral metrics, heatmaps, and session replay to improve the user experience. By using this site, you agree that I and Microsoft can collect and use this data. "}
            <ChakraLink asChild color="fg.muted" textDecoration="underline" _hover={{ color: "fg" }}>
              <a href="https://privacy.microsoft.com/en-US/privacystatement" target="_blank" rel="noopener noreferrer">
                {dict?.microsoftPrivacy || "Microsoft Privacy Statement"}
              </a>
            </ChakraLink>.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}