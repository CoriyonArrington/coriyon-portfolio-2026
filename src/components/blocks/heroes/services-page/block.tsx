'use client'

import { Box, Button } from '@chakra-ui/react'
import { LuChevronDown, LuBot } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo } from 'react'
import { CenteredHeroLayout } from '../centered-hero-layout/block'

interface ServicesHeroProps {
  dict?: any; title?: string; description?: string; tagline?: string; exploreText?: string; secondaryText?: string; children?: React.ReactNode;
}

export const Block = ({ dict, title, description, tagline, exploreText, secondaryText, children }: ServicesHeroProps) => {
  const { playClick, playHover } = useUiSounds()

  const handleScroll = () => {
    playClick()
    const element = document.getElementById('pricing')
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
    }
  }

  const handleOpenChat = () => {
    playClick()
    window.dispatchEvent(new Event('open-ai-chat'))
  }

  const rawTitle = title || dict?.title || 'Services & Offerings'
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    return { displayTitle: rawTitle.replace(/\*/g, ''), highlightQueries: queries }
  }, [rawTitle])

  return (
    <CenteredHeroLayout
      badge={tagline || dict?.tagline}
      title={displayTitle}
      highlightQueries={highlightQueries}
      description={description || dict?.description}
      primaryAction={
        <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="green" variant="solid" onClick={handleScroll} onMouseEnter={playHover} w={{ base: 'full', md: 'auto' }}>
          {exploreText || dict?.exploreText || "View services"} <LuChevronDown style={{ marginLeft: '8px' }} />
        </Button>
      }
      secondaryAction={
        <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" variant="solid" colorPalette="gray" onClick={handleOpenChat} onMouseEnter={playHover} w={{ base: 'full', md: 'auto' }}>
          {secondaryText || dict?.secondaryText || "Chat with AI"} <LuBot style={{ marginLeft: '8px' }} />
        </Button>
      }
    >
      {children && <Box id="pricing" w="full">{children}</Box>}
    </CenteredHeroLayout>
  )
}