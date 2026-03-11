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
import { usePathname, useRouter } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { LuChevronDown } from 'react-icons/lu'

interface NavLink {
  id: string;
  slug: string;
  nav_title: string;
  page_type?: string; 
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

  const safeLinks = Array.isArray(links) ? links : [];
  const filteredLinks = safeLinks.filter(l => l.slug !== 'home' && l.slug !== '/');

  const fallbackPrimarySlugs = ['about', 'work', 'projects', 'services'];
  
  const primaryLinks = filteredLinks.filter(l => 
    l.page_type === 'MAIN_MENU' || (!l.page_type && fallbackPrimarySlugs.includes(l.slug))
  );
  
  const exploreLinks = filteredLinks.filter(l => 
    l.page_type === 'EXPLORE' || (!l.page_type && !fallbackPrimarySlugs.includes(l.slug))
  );

  if (filteredLinks.length === 0) return null;

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
              color={isActive ? "colorPalette.fg" : "fg.muted"}
              transition="color 0.2s"
              _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
              onClick={(e) => handleScroll(e, href)}
              onMouseEnter={playHover}
              whiteSpace="nowrap"
              display="block" 
              textAlign="center"
              w="full"
            >
              <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>
                {page.nav_title}
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
            color={isActive ? "colorPalette.fg" : "fg.muted"}
            transition="color 0.2s"
            _hover={{ color: 'colorPalette.fg', textDecoration: 'none' }}
            onClick={(e) => handleScroll(e, href)}
            onMouseEnter={playHover}
            whiteSpace="nowrap"
          >
            <NextLink href={href} scroll={!(href.includes('#') && checkIsSamePage(href))}>
              {page.nav_title}
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
                _hover={{ color: "colorPalette.fg" }}
                onMouseEnter={playHover}
                px="0"
                h="auto"
              >
                More <LuChevronDown style={{ marginLeft: '4px', width: '14px' }} />
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
                    _hover={{ bg: "colorPalette.muted", color: "colorPalette.fg" }}
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
                      {page.nav_title}
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