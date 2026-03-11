'use client'

import { Box, Button, Center } from '@chakra-ui/react'
import { LuChevronDown, LuBot } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo } from 'react'
import { CenteredHeroLayout } from '../centered-hero-layout/block'

interface PlaygroundHeroProps {
  dict?: any; title?: string; description?: string; tagline?: string; exploreText?: string; secondaryText?: string; interactiveElement?: React.ReactNode;
}

export const Block = ({ dict, title, description, tagline, exploreText, secondaryText, interactiveElement }: PlaygroundHeroProps) => {
  const { playClick, playHover } = useUiSounds()

  const handleScroll = () => {
    playClick()
    const element = document.getElementById('playground-projects')
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
    }
  }

  const rawTitle = title || dict?.title || 'Creative Playground'
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
          {exploreText || dict?.exploreText || "Explore projects"} <LuChevronDown style={{ marginLeft: '8px' }} />
        </Button>
      }
      secondaryAction={
        <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" variant="solid" colorPalette="gray" onClick={() => { playClick(); window.dispatchEvent(new Event('open-ai-chat')); }} onMouseEnter={playHover} w={{ base: 'full', md: 'auto' }}>
          {secondaryText || dict?.secondaryText || "Chat with AI"} <LuBot style={{ marginLeft: '8px' }} />
        </Button>
      }
    >
      <Box maxW="5xl" mx="auto" w="full" position="relative" borderRadius="l3" overflow="hidden" borderWidth="1px" borderColor="border.subtle" bg="bg.muted" shadow="md" aspectRatio={{ base: "4/3", md: "16/9" }}>
        <Center position="absolute" inset="0" zIndex="0" pointerEvents="auto">
          {interactiveElement}
        </Center>
      </Box>
    </CenteredHeroLayout>
  )
}