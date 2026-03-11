'use client'

import { Box, Container, Heading, SimpleGrid, Stack, Text, Badge, Button, Highlight, VStack } from '@chakra-ui/react'
import { LuChevronDown, LuYoutube, LuDownload, LuCalendar } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticlePreview } from './article-preview'
import { CalendlyPopup } from '@/components/ui/calendly-popup'

const getYouTubeVideoId = (url: string) => {
  if (!url) return ""
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0]
  if (url.includes("youtube.com/watch")) {
    try { return new URL(url).searchParams.get("v") || "" } catch (e) {}
  }
  if (url.includes("youtube.com/embed/")) return url.split("youtube.com/embed/")[1]?.split("?")[0]
  return ""
}

interface BlogProps {
  dict?: any
  posts?: any[]
  locale?: string
}

export const Block = ({ dict, posts, locale = 'en' }: BlogProps) => {
  const { playHover, playClick } = useUiSounds()
  const router = useRouter()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const rawTitle = dict?.title || (locale === 'es' ? "Lo último" : "Latest")
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  // --- SMART PRIMARY ACTION ---
  const handlePrimaryClick = (e: React.MouseEvent) => {
    playClick()
    const text = (dict?.exploreText || "").toLowerCase()
    
    // If the text implies a call, override scroll and open Calendly
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

  const getPrimaryIcon = () => {
    const text = (dict?.exploreText || "").toLowerCase()
    if (text.includes('call') || text.includes('intro') || text.includes('book')) return <LuCalendar style={{ marginLeft: '8px' }} />
    return <LuChevronDown style={{ marginLeft: '8px' }} />
  }

  // --- SMART SECONDARY ACTION ---
  const handleSecondaryClick = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    const text = (dict?.secondaryText || "").toLowerCase()
    const url = dict?.secondaryUrl || ""

    if (text.includes('call') || text.includes('intro') || text.includes('book') || url === '#calendly') {
      setIsCalendlyOpen(true)
    } else if (url) {
      if (url.startsWith('http') || url.endsWith('.pdf')) {
        window.open(url, '_blank')
      } else {
        router.push(url)
      }
    }
  }

  const getSecondaryIcon = () => {
    const text = (dict?.secondaryText || "").toLowerCase()
    if (text.includes('subscribe')) return <LuYoutube style={{ marginLeft: '8px' }} />
    if (text.includes('resume') || text.includes('download')) return <LuDownload style={{ marginLeft: '8px' }} />
    if (text.includes('call') || text.includes('intro') || text.includes('book')) return <LuCalendar style={{ marginLeft: '8px' }} />
    return null
  }

  const ytVideoId = getYouTubeVideoId(dict?.videoUrl || "")
  const finalVideoUrl = ytVideoId ? `https://www.youtube.com/embed/${ytVideoId}?rel=0` : dict?.videoUrl

  return (
    <Box w="full">
      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
      
      <VStack gap={{ base: '12', md: '16' }} textAlign="center" w="full" pt={{ base: '32', md: '40' }} pb={{ base: '16', md: '24' }}>
        <Stack gap="6" align="center" px={{ base: '4', md: '8' }}>
          {dict?.tagline && (
            <Badge size="lg" variant="subtle" colorPalette="gray" alignSelf="center" rounded="full" px="4" py="1">
              {dict.tagline}
            </Badge>
          )}
          
          <Heading
            as="h1"
            textStyle={{ base: '5xl', md: '6xl', lg: '7xl' }}
            maxW="4xl"
            mx="auto"
            lineHeight={{ base: '1.2', md: '1.1' }}
            fontWeight="bold"
            letterSpacing="tight"
          >
            <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
              {displayTitle}
            </Highlight>
          </Heading>
          
          {dict?.description && (
            <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl" mx="auto">
              {dict?.description}
            </Text>
          )}

          <Stack align="center" direction={{ base: 'column', md: 'row' }} gap="4" mt="6" w={{ base: 'full', md: 'auto' }}>
            <Button 
              size="xl" 
              h={{ base: 14, md: 16 }}
              px={{ base: 6, md: 8 }}
              fontSize="lg"
              colorPalette="green" 
              variant="solid"
              onClick={handlePrimaryClick} 
              onMouseEnter={playHover}
              w={{ base: 'full', md: 'auto' }}
            >
              {dict?.exploreText || 'Learn more'} {getPrimaryIcon()}
            </Button>

            {dict?.secondaryText && (
              <Button 
                size="xl" 
                h={{ base: 14, md: 16 }}
                px={{ base: 6, md: 8 }}
                fontSize="lg"
                variant="solid" 
                colorPalette="gray"
                onMouseEnter={playHover} 
                onClick={handleSecondaryClick}
                w={{ base: 'full', md: 'auto' }}
              >
                {dict?.secondaryText} {getSecondaryIcon()}
              </Button>
            )}
          </Stack>
        </Stack>

        {dict?.videoUrl && (
          <Box w="full" px={{ base: '4', md: '8' }} mt={{ base: 4, md: 8 }}>
            <Box maxW="5xl" mx="auto" rounded="3xl" overflow="hidden" bg="bg.panel" borderWidth="1px" borderColor="border.subtle" shadow="2xl" w="full">
              <Box aspectRatio={16/9} w="full" bg="black">
                {ytVideoId ? (
                  <iframe src={finalVideoUrl} title="Introduction Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
                ) : (
                  <video src={finalVideoUrl} controls playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </VStack>
      
      {posts && posts.length > 0 && (
        <Box id="featured-video" pb={{ base: '16', md: '24' }}>
          <Stack gap={{ base: '16', md: '24' }}>
            <ArticlePreview post={posts.find(p => p.isFeatured) || posts[0]} hero />
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="10">
              {posts.filter((_, i) => i !== 0).map((post) => (
                <ArticlePreview key={post.id} post={post} />
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      )}
    </Box>
  )
}