'use client'

import { useState, useEffect } from 'react'
import { Box, Container, HStack, Stack, Text, IconButton, Link as ChakraLink, Avatar, SimpleGrid, Separator } from '@chakra-ui/react'
import { LuLinkedin, LuGithub, LuYoutube, LuCopy, LuCheck, LuDownload } from 'react-icons/lu'
import { LanguageSwitcher } from '@/components/blocks/marketing-navbars/navbar-island/language-switcher'
import { ColorModeButton } from '@/components/ui/color-mode'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { SoundToggle } from '../../marketing-navbars/navbar-island/sound-toggle'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { DownloadTrigger } from '@/components/ui/download-trigger'
import { Block as PageNav } from '@/components/blocks/marketing-navbars/page-nav/block'
import { supabase } from '@/lib/supabase'

interface FooterProps {
  dict?: any;
}

export const Block = ({ dict }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const { playHover, playWhoosh, playClick, playSuccess } = useUiSounds()
  const [hasCopied, setHasCopied] = useState(false)
  const pathname = usePathname() || ''
  
  // State for database pages
  const [pagesList, setPagesList] = useState<any[]>([])

  const emailAddress = "coriyonarrington@gmail.com"

  // Fetch all PUBLISHED pages
  useEffect(() => {
    const fetchPages = async () => {
      const { data } = await supabase
        .from('pages')
        .select('id, slug, title, nav_title, sort_order, page_type, status')
        .eq('status', 'PUBLISHED')
        .order('sort_order', { ascending: true })
      
      if (data) {
        setPagesList(data)
      }
    }
    fetchPages()
  }, [])

  // Organize pages by type for the footer columns
  const mainMenuPages = pagesList.filter(p => p.page_type === 'MAIN_MENU' || p.page_type === 'STANDARD')
  const explorePages = pagesList.filter(p => p.page_type === 'EXPLORE')
  
  // Filter ALL pages for the Previous/Next interstitial nav (excluding hash links)
  const navPages = pagesList.filter(p => p.sort_order > 0 && !p.slug.includes('#'))

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    navigator.clipboard.writeText(emailAddress)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'
  const currentLocale = (segments.length > 0 && segments[0].length === 2) ? segments[0] : 'en'

  // Safely converts database slugs and hash fragments to valid, localized absolute hrefs
  const getHref = (slug: string) => {
    if (!slug) return homePath;
    if (slug === 'home' || slug === '/') return homePath;
    
    // Handle direct hash links (e.g., "#process" meant for the home page)
    if (slug.startsWith('#')) {
      const base = homePath === '/' ? '' : homePath;
      return `${base}/${slug}`; // e.g., /en/#process
    }
    
    // Handle path + hash links (e.g., "about#services")
    if (slug.includes('#')) {
      const [pagePart, hashPart] = slug.split('#');
      const cleanPage = pagePart.startsWith('/') ? pagePart : `/${pagePart}`;
      const base = homePath === '/' ? cleanPage : `${homePath}${cleanPage}`;
      return `${base}#${hashPart}`; // e.g., /en/about#services
    }

    // Standard pages
    const cleanPath = slug.startsWith('/') ? slug : `/${slug}`;
    return homePath === '/' ? cleanPath : `${homePath}${cleanPath}`;
  }

  const handleScroll = (e: React.MouseEvent<HTMLElement>, href: string) => {
    // If it's a standard link, just let NextLink route normally
    if (!href.includes('#')) {
      playWhoosh();
      return;
    }

    const [pathPart, hashPart] = href.split('#')
    
    // Normalize paths to ensure accurate matching (e.g. '/en/' matches '/en')
    const normalizePath = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : (p || '/');
    const isCurrentPage = normalizePath(pathPart) === normalizePath(pathname);

    // If the hash is on the current page, scroll smoothly
    if (hashPart && isCurrentPage) {
      e.preventDefault()
      playWhoosh()
      const element = document.getElementById(hashPart)
      
      if (element) {
        const offset = 120 
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        window.history.pushState(null, '', `#${hashPart}`)
      }
    } else {
      // If the hash is on a DIFFERENT page, let NextLink handle the hard navigation
      playWhoosh()
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    playClick()
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', window.location.pathname)
  }

  // --- Dynamic Interstitial Logic ---
  const isProjectDetail = segments.length >= 2 && segments[segments.length - 2] === 'projects'
  
  let currentSlug = 'home'
  if (segments.length > 0 && segments[0].length === 2) {
    currentSlug = segments.length > 1 ? segments[1] : 'home'
  } else {
    currentSlug = segments.length > 0 ? segments[0] : 'home'
  }

  let navPrev = null
  let navNext = null
  let navDict = { 
    previous: currentLocale === 'es' ? 'Anterior' : 'Previous',
    next: currentLocale === 'es' ? 'Siguiente' : 'Up next' 
  }

  if (!isProjectDetail && navPages.length > 0) {
    const currentIndex = navPages.findIndex(p => p.slug === currentSlug)

    if (currentIndex !== -1) {
      // Calculate Previous
      if (currentIndex > 0) {
        const prevPage = navPages[currentIndex - 1]
        const dictKey = prevPage.slug.includes('#') ? prevPage.slug.split('#')[1] : prevPage.slug;
        navPrev = {
          title: dict?.[`${dictKey}Link`] || prevPage.nav_title || prevPage.title,
          href: getHref(prevPage.slug)
        }
      }

      // Calculate Next
      if (currentIndex < navPages.length - 1) {
        const nextPage = navPages[currentIndex + 1]
        const dictKey = nextPage.slug.includes('#') ? nextPage.slug.split('#')[1] : nextPage.slug;
        navNext = {
          title: dict?.[`${dictKey}Link`] || nextPage.nav_title || nextPage.title,
          href: getHref(nextPage.slug)
        }
      }
    }
  }

  return (
    <>
      {/* Inject PageNav directly above the footer if we are not on a project detail page */}
      {!isProjectDetail && (navPrev || navNext) && (
        <Box py={{ base: "12", md: "20" }} bg="bg.canvas">
          <Container maxW="5xl" px={{ base: "4", md: "8" }}>
             <PageNav prev={navPrev} next={navNext} dict={navDict} />
          </Container>
        </Box>
      )}

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
              
              {/* Dynamic Main Menu Column */}
              <Stack gap="4" minW={{ md: '40' }}>
                <Text fontWeight="medium" color="fg">{dict?.mainMenu || "Main Menu"}</Text>
                <Stack gap="3" alignItems="start">
                  {mainMenuPages.map((page) => {
                    const href = getHref(page.slug);
                    const dictKey = page.slug.includes('#') ? page.slug.split('#')[1] : page.slug;
                    const label = dict?.[`${dictKey}Link`] || page.nav_title || page.title;
                    
                    return (
                      <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                        <NextLink href={href}>{label}</NextLink>
                      </ChakraLink>
                    )
                  })}
                </Stack>
              </Stack>

              {/* Dynamic Explore Column */}
              <Stack gap="4" minW={{ md: '40' }}>
                <Text fontWeight="medium" color="fg">{dict?.explore || "Explore"}</Text>
                <Stack gap="3" alignItems="start">
                  {explorePages.map((page) => {
                    const href = getHref(page.slug);
                    const dictKey = page.slug.includes('#') ? page.slug.split('#')[1] : page.slug;
                    const label = dict?.[`${dictKey}Link`] || page.nav_title || page.title;

                    return (
                      <ChakraLink key={page.id} asChild color="fg.muted" _hover={{ color: "fg", textDecoration: "none" }} onClick={(e) => handleScroll(e, href)} onMouseEnter={playHover}>
                        <NextLink href={href}>{label}</NextLink>
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
                {dict?.copyright || `© ${currentYear} Coriyon Arrington. Based in Minneapolis.`}
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
    </>
  )
}