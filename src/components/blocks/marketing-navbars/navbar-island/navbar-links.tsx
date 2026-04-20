'use client'

import { 
  Link, 
  Stack, 
  type StackProps, 
  MenuRoot, 
  MenuTrigger, 
  MenuContent, 
  MenuItem, 
  Button,
  Box 
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { LuChevronDown } from 'react-icons/lu'

interface NavLink {
  id: string;
  slug: string;
  nav_title: string;
  page_type?: string; 
  [key: string]: any; 
}

interface NavbarLinksProps extends StackProps {
  links: NavLink[];
  onLinkClick?: () => void;
  isMobile?: boolean;
}

export const NavbarLinks = ({ links, onLinkClick, isMobile = false, ...props }: NavbarLinksProps) => {
  const { playHover, playWhoosh } = useUiSounds()
  const pathname = usePathname() || ''
  const router = useRouter()
  const params = useParams()
  
  const currentLocale = (params?.locale as string) || 'en'
  
  const segments = pathname.split('/').filter(Boolean)
  const homePath = (segments.length > 0 && segments[0].length === 2) ? `/${segments[0]}` : '/'

  const getHref = (slug: string) => {
    if (!slug || slug === 'home' || slug === '/') return homePath;
    
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
      onLinkClick?.()
      return;
    }

    const hashPart = href.split('#')[1]

    if (hashPart && checkIsSamePage(href)) {
      e.preventDefault()
      
      const element = document.getElementById(hashPart)
      if (element) {
        onLinkClick?.()
        router.push(`${pathname}#${hashPart}`, { scroll: false })
        window.dispatchEvent(new Event('app-hash-change'))

        setTimeout(() => {
          const offset = 120 
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 10)
      }
    } else {
      playWhoosh()
      onLinkClick?.()
    }
  }

  const getLocalizedTitle = (page: NavLink) => {
    let title = page[`nav_title_${currentLocale}`] || page[`title_${currentLocale}`] || page.nav_title || page.title || '';
    if (currentLocale === 'es') {
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

  const safeLinks = Array.isArray(links) ? links : [];
  
  const fallbackPrimarySlugs = ['home', '/', 'about', 'work', 'projects', 'services'];
  
  // 1. Initial sorting: Force 'contact' out of primary
  const rawPrimaryLinks = safeLinks.filter(l => {
    const isContact = l.slug === 'contact' || l.slug === '/contact';
    if (isContact) return false; 
    return l.page_type === 'MAIN_MENU' || (!l.page_type && fallbackPrimarySlugs.includes(l.slug));
  });
  
  // 2. Initial sorting: Force 'contact' into explore
  const rawExploreLinks = safeLinks.filter(l => {
    const isContact = l.slug === 'contact' || l.slug === '/contact';
    if (isContact) return true; 
    return l.page_type === 'EXPLORE' || (!l.page_type && !fallbackPrimarySlugs.includes(l.slug));
  });

  // 3. Enforce max 4 items in primary nav, overflow the rest to the 'More' menu
  const primaryLinks = rawPrimaryLinks.slice(0, 4);
  const overflowLinks = rawPrimaryLinks.slice(4);
  const exploreLinks = [...overflowLinks, ...rawExploreLinks];

  if (safeLinks.length === 0) return null;

  if (isMobile) {
    const mobileOrderedLinks = [...primaryLinks, ...exploreLinks];
    return (
      <Stack direction="column" gap="8" alignItems="center" w="full" {...props}>
        {mobileOrderedLinks.map((page) => {
          const href = getHref(page.slug)
          const isActive = href !== homePath 
            ? pathname.includes(href.split('#')[0]) 
            : pathname === homePath || pathname === `${homePath}/`
            
          return (
            <Link
              key={page.id || page.slug}
              asChild
              fontWeight={isActive ? "bold" : "medium"}
              fontSize="2xl"
              color={isActive ? "colorPalette.500" : "fg.muted"}
              transition="color 0.2s"
              _hover={{ color: 'colorPalette.500', textDecoration: 'none' }}
              onClick={(e) => handleScroll(e, href)}
              onMouseEnter={playHover}
              whiteSpace="nowrap"
              display="block" 
              textAlign="center"
              w="full"
            >
              <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>
                {getLocalizedTitle(page)}
              </NextLink>
            </Link>
          )
        })}
      </Stack>
    )
  }

  return (
    <Stack direction="row" alignItems="center" gap="8" {...props}>
      {primaryLinks.map((page) => {
        const href = getHref(page.slug)
        const isActive = href !== homePath 
          ? pathname.includes(href.split('#')[0]) 
          : pathname === homePath || pathname === `${homePath}/`
          
        return (
          <Link
            key={page.id || page.slug}
            asChild
            fontWeight={isActive ? "bold" : "medium"}
            color={isActive ? "colorPalette.500" : "fg.muted"}
            transition="color 0.2s"
            _hover={{ color: 'colorPalette.500', textDecoration: 'none' }}
            onClick={(e) => handleScroll(e, href)}
            onMouseEnter={playHover}
            whiteSpace="nowrap"
          >
            <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>
              {getLocalizedTitle(page)}
            </NextLink>
          </Link>
        )
      })}

      {exploreLinks.length > 0 && (
        <Box position="relative">
          <MenuRoot id="navbar-more-menu">
            <MenuTrigger asChild>
              <Button 
                variant="plain" 
                size="md" 
                fontSize="md"
                fontWeight="medium" 
                color="fg.muted"
                transition="color 0.2s"
                _hover={{ color: "colorPalette.500" }}
                onMouseEnter={playHover}
                px="0"
                h="auto"
              >
                {currentLocale === 'es' ? 'Más' : 'More'} <LuChevronDown style={{ marginLeft: '4px', width: '14px' }} />
              </Button>
            </MenuTrigger>
            
            <MenuContent 
              bg="bg.panel" 
              borderRadius="xl" 
              border="1px solid" 
              borderColor="border.subtle" 
              p="1" 
              zIndex="2000"
              css={{
                position: "absolute !important",
                top: "calc(100% + 12px) !important",
                right: "0 !important",
                transform: "none !important",
                minWidth: "160px !important"
              }}
            >
              {exploreLinks.map((page) => {
                 const href = getHref(page.slug)
                 
                 return (
                  <MenuItem 
                    key={page.id || page.slug} 
                    value={page.slug}
                    asChild
                    borderRadius="md"
                    color="fg.muted"
                    _hover={{ bg: "bg.muted", color: "colorPalette.500" }}
                    onClick={(e) => { 
                      playWhoosh(); 
                      handleScroll(e as any, href); 
                    }}
                    onMouseEnter={playHover}
                  >
                    <NextLink 
                      href={href} 
                      scroll={!(href.includes('#') && checkIsSamePage(href))} 
                      style={{ display: 'block', width: '100%', padding: '8px 12px', color: 'currentColor', textDecoration: 'none' }}
                    >
                      {getLocalizedTitle(page)}
                    </NextLink>
                  </MenuItem>
                 )
              })}
            </MenuContent>
          </MenuRoot>
        </Box>
      )}
    </Stack>
  )
}