'use client'

import { Button, Popover, Portal, Stack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { LuChevronDown, LuGlobe } from 'react-icons/lu'
import { useRouter, usePathname } from 'next/navigation'
import { i18nConfig } from '@/i18n'
import { useUiSounds } from '@/hooks/use-ui-sounds'

const minnesotaLanguages = [
  { name: 'English', locale: 'en', flag: '🇺🇸' },
  { name: 'Spanish', locale: 'es', flag: '🇲🇽' },
]

export const LanguageSwitcher = () => {
  const router = useRouter()
  const currentPathname = usePathname()
  const { playHover, playClick } = useUiSounds()
  const [mounted, setMounted] = useState(false) // OPTIMIZATION: Hydration safety
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  const currentLocale = i18nConfig.locales.find(loc => currentPathname.startsWith(`/${loc}`)) || i18nConfig.defaultLocale
  const currentLang = minnesotaLanguages.find(l => l.locale === currentLocale) || minnesotaLanguages[0]

  const handleLanguageChange = (newLocale: string) => {
    playClick()
    setOpen(false)

    if (currentLocale === i18nConfig.defaultLocale && !currentPathname.startsWith(`/${i18nConfig.defaultLocale}`)) {
      router.push(`/${newLocale}${currentPathname}`, { scroll: false })
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`), { scroll: false })
    }
  }

  return (
    <Popover.Root 
      open={open} 
      onOpenChange={(e) => setOpen(e.open)} 
      positioning={{ placement: 'bottom-end', offset: { mainAxis: 12 } }}
    >
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          px="2" 
          color="fg.muted" 
          _hover={{ color: 'fg' }}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          {/* OPTIMIZATION: Render a safe fallback until hydration completes to prevent a mismatch crash */}
          {mounted ? (
            <span style={{ fontSize: '1.2em' }}>{currentLang.flag}</span>
          ) : (
            <LuGlobe size="18" /> 
          )}
          <span style={{ display: 'none' }} className="md:inline">{mounted ? currentLang.name : 'Language'}</span>
          <LuChevronDown />
        </Button>
      </Popover.Trigger>
      
      <Portal>
        <Popover.Positioner zIndex={1000}>
          <Popover.Content 
            width="fit-content" 
            p="2" 
            borderRadius="md" 
            boxShadow="md" 
            bg="bg.panel"
            outline="none"
          >
            <Stack gap="1">
              {minnesotaLanguages.map((lang) => (
                <Button
                  key={lang.locale}
                  variant={currentLocale === lang.locale ? 'subtle' : 'ghost'}
                  size="sm"
                  justifyContent="flex-start"
                  onClick={() => handleLanguageChange(lang.locale)}
                  onMouseEnter={playHover}
                >
                  <span style={{ marginRight: '8px', fontSize: '1.2em' }}>{lang.flag}</span>
                  {lang.name}
                </Button>
              ))}
            </Stack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}