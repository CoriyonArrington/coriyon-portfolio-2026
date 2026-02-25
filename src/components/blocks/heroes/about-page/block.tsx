'use client'

import { Box, Button, Heading, HStack, Text, VStack, Highlight } from '@chakra-ui/react'
import { LuCalendar, LuDownload } from 'react-icons/lu'
import { VideoPlaceholder } from './video-placeholder'
import { useState, useMemo } from 'react'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { CalendlyPopup } from '@/components/ui/calendly-popup'

// Helper to extract the YouTube ID from any standard link
const getYouTubeVideoId = (url: string) => {
  if (!url) return ""
  if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0]
  if (url.includes("youtube.com/watch")) {
    try { return new URL(url).searchParams.get("v") || "" } catch (e) {}
  }
  if (url.includes("youtube.com/embed/")) return url.split("youtube.com/embed/")[1]?.split("?")[0]
  return ""
}

interface BlockProps {
  dict?: any
  title?: string
  description?: string
  videoUrl?: string
}

export const Block = ({ dict, title, description, videoUrl }: BlockProps) => {
  const { playHover, playClick, playSuccess } = useUiSounds()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const rawTitle = title || dict?.title || "About Me"
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const handleOpenCalendly = () => {
    playClick()
    setIsCalendlyOpen(true)
  }

  const handleDownload = () => {
    playSuccess()
    const link = document.createElement('a')
    link.href = '/Resume-Coriyon Arrington-Senior Product Designer.pdf'
    link.download = 'Coriyon_Arrington_Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Determine if the URL is a YouTube link
  const targetVideoUrl = videoUrl || dict?.videoUrl || dict?.introVideoUrl
  const ytVideoId = getYouTubeVideoId(targetVideoUrl || "")
  const isYouTube = !!ytVideoId
  
  // Format YouTube URL to show controls natively
  const finalVideoUrl = isYouTube 
    ? `https://www.youtube.com/embed/${ytVideoId}?controls=1&rel=0` 
    : targetVideoUrl

  return (
    <Box rounded="3xl" overflow="hidden" bg="bg.panel" borderWidth="1px" borderColor="border.subtle" shadow="xl" w="full">
      
      {/* Cinematic 16:9 Video Player */}
      <Box aspectRatio={16/9} w="full" bg="black" borderBottomWidth="1px" borderColor="border.subtle">
        {isYouTube ? (
          <iframe
            src={finalVideoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : finalVideoUrl ? (
          <video
            src={finalVideoUrl}
            controls
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <VideoPlaceholder h="full" w="full" />
        )}
      </Box>
      
      {/* Content Section cleanly below the video */}
      <VStack py={{ base: 8, md: 12 }} px={{ base: 6, md: 12 }} textAlign="center" maxW="4xl" mx="auto">
        <Heading as="h1" textStyle={{ base: '4xl', md: '5xl', lg: '6xl' }} fontWeight="bold" letterSpacing="tight">
          <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
            {displayTitle}
          </Highlight>
        </Heading>
        
        <Text mt="4" mb="8" textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted" maxW="2xl">
          {description || dict?.description}
        </Text>
        
        <HStack gap="4" flexDir={{ base: 'column', sm: 'row' }} w={{ base: 'full', sm: 'auto' }}>
          <Button 
            size="xl" 
            h={{ base: 14, md: 16 }}
            px={{ base: 6, md: 8 }}
            fontSize="lg"
            colorPalette="green" 
            onClick={handleOpenCalendly} 
            onMouseEnter={playHover}
            w={{ base: 'full', sm: 'auto' }}
          >
            {dict?.primaryCta || "Book an intro call"} <LuCalendar />
          </Button>
          
          <Button 
            size="xl" 
            h={{ base: 14, md: 16 }}
            px={{ base: 6, md: 8 }}
            fontSize="lg"
            variant="solid" 
            colorPalette="gray"
            onClick={handleDownload}
            onMouseEnter={playHover}
            w={{ base: 'full', sm: 'auto' }}
          >
            {dict?.secondaryCta || "Download Resume"} <LuDownload />
          </Button>
        </HStack>
      </VStack>

      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </Box>
  )
}