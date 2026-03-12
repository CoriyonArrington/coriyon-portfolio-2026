'use client'

import { Box, SimpleGrid, Stack, Button } from '@chakra-ui/react'
import { LuChevronDown, LuYoutube, LuDownload, LuCalendar } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArticlePreview } from './article-preview'
import { CalendlyPopup } from '@/components/ui/calendly-popup'
import { CenteredHeroLayout } from '../centered-hero-layout/block'

const getYouTubeVideoId = (url: string) => {
  if (!url) return ""
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0]
  if (url.includes("youtube.com/watch")) {
    try { return new URL(url).searchParams.get("v") || "" } catch (e) {}
  }
  if (url.includes("youtube.com/embed/")) return url.split("youtube.com/embed/")[1]?.split("?")[0]
  return ""
}

interface ContentPageHeroProps {
  dict?: any
  posts?: any[]
  locale?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export const Block = ({ dict, posts, locale = 'en', primaryAction, secondaryAction }: ContentPageHeroProps) => {
  const { playHover, playClick } = useUiSounds()
  const router = useRouter()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const rawTitle = dict?.title || (locale === 'es' ? "Lo último" : "Latest")
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    return { displayTitle: rawTitle.replace(/\*/g, ''), highlightQueries: queries }
  }, [rawTitle])

  const handlePrimaryClick = () => {
    playClick()
    const text = (dict?.exploreText || "").toLowerCase()
    if (text.includes('call') || text.includes('intro') || text.includes('book')) {
      setIsCalendlyOpen(true)
      return
    }
    const element = document.getElementById('content-start') || document.getElementById('featured-video')
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleSecondaryClick = () => {
    playClick()
    const text = (dict?.secondaryText || "").toLowerCase()
    const url = dict?.secondaryUrl || ""
    if (text.includes('call') || text.includes('intro') || text.includes('book') || url === '#calendly') {
      setIsCalendlyOpen(true)
    } else if (url) {
      url.startsWith('http') || url.endsWith('.pdf') ? window.open(url, '_blank') : router.push(url)
    }
  }

  const primaryText = dict?.exploreText || 'Learn more'
  const primaryIcon = primaryText.toLowerCase().match(/call|intro|book/) ? <LuCalendar style={{ marginLeft: '8px' }} /> : <LuChevronDown style={{ marginLeft: '8px' }} />
  
  const secText = (dict?.secondaryText || "").toLowerCase()
  const secIcon = secText.includes('subscribe') ? <LuYoutube style={{ marginLeft: '8px' }} /> : secText.includes('resume') || secText.includes('download') ? <LuDownload style={{ marginLeft: '8px' }} /> : secText.match(/call|intro|book/) ? <LuCalendar style={{ marginLeft: '8px' }} /> : null

  const ytVideoId = getYouTubeVideoId(dict?.videoUrl || "")
  const finalVideoUrl = ytVideoId ? `https://www.youtube.com/embed/${ytVideoId}?rel=0` : dict?.videoUrl

  return (
    <Box w="full">
      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      
      <CenteredHeroLayout
        badge={dict?.tagline}
        title={displayTitle}
        highlightQueries={highlightQueries}
        description={dict?.description}
        primaryAction={primaryAction || (
          <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="green" variant="solid" onClick={handlePrimaryClick} onMouseEnter={playHover} w={{ base: 'full', md: 'auto' }}>
            {primaryText} {primaryIcon}
          </Button>
        )}
        secondaryAction={secondaryAction || (
          dict?.secondaryText && (
            <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" variant="solid" colorPalette="gray" onMouseEnter={playHover} onClick={handleSecondaryClick} w={{ base: 'full', md: 'auto' }}>
              {dict.secondaryText} {secIcon}
            </Button>
          )
        )}
      >
        {dict?.videoUrl && (
          <Box maxW="5xl" mx="auto" rounded="3xl" overflow="hidden" bg="black" borderWidth="1px" borderColor="border.subtle" shadow="2xl" w="full">
            <Box aspectRatio={16/9} w="full">
              {ytVideoId ? (
                <iframe src={finalVideoUrl} title="Introduction Video" allowFullScreen style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
              ) : (
                <video src={finalVideoUrl} controls playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
              )}
            </Box>
          </Box>
        )}
      </CenteredHeroLayout>
      
      {posts && posts.length > 0 && (
        <Box id="featured-video" pb={{ base: '16', md: '24' }}>
          <Stack gap={{ base: '16', md: '24' }}>
            <ArticlePreview post={posts.find(p => p.isFeatured) || posts[0]} hero />
            {posts.length > 1 && (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="10">
                {posts.filter((_, i) => i !== 0).map((post) => (
                  <ArticlePreview key={post.id} post={post} />
                ))}
              </SimpleGrid>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  )
}