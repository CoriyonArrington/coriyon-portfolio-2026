'use client'

import { Badge, Box, Button, Center, Dialog, Portal, IconButton, Wrap, Stack, Text, Heading, Highlight } from '@chakra-ui/react'
import { LuChevronDown, LuEye, LuX } from 'react-icons/lu'
import Image from 'next/image'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useMemo, useState } from 'react'
import { SplitScreenHeroLayout } from '../split-screen-hero-layout/block'

interface OverviewData {
  role?: string | null; duration?: string | null; year?: string | number | null; teamRoles?: string | null; users?: string | null; deliverables?: string | null; summary?: string | null; industries?: string | null; platforms?: string | null; labels?: Record<string, string>;
}

interface HeroProps {
  dict?: any; title?: string; description?: string; tagline?: string; tags?: string[]; imageUrl?: string | null; videoUrl?: string | null; mockupType?: string | null; bgColor?: string | null; primaryCtaText?: string; secondaryCtaText?: string; primaryScrollTo?: string; isProtected?: boolean; overviewData?: OverviewData;
}

export const Block = ({ 
  dict, title, description, tagline, tags, imageUrl, videoUrl, mockupType, bgColor,
  primaryCtaText, secondaryCtaText, primaryScrollTo = 'outcomes', isProtected = false, overviewData
}: HeroProps) => {
  const { playClick, playHover } = useUiSounds()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // FIX: Removed window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) which caused the jump on language change!
  }, [])

  const handleScroll = () => {
    playClick()
    const element = document.getElementById(isProtected ? 'unlock-section' : primaryScrollTo)
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  const rawTitle = title || dict?.title || 'Project title'
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    return { displayTitle: rawTitle.replace(/\*/g, ''), highlightQueries: queries }
  }, [rawTitle])

  const l = overviewData?.labels || {
    role: "Role", duration: "Duration", team: "Team", users: "Users", deliverables: "Deliverables", year: "Year", industry: "Industry", overview: "Project Overview"
  };

  const normalizedMockup = String(mockupType || dict?.mockupType || '').toLowerCase().trim();
  const isPhone = normalizedMockup === 'phone' || normalizedMockup === 'mobile' || normalizedMockup === 'iphone';
  const isTablet = normalizedMockup === 'tablet' || normalizedMockup === 'ipad';
  const isPadded = normalizedMockup === 'padded';

  const isRawMedia = !isPhone && !isTablet;

  const MediaContent = () => (
    <>
      {(imageUrl || dict?.imageUrl) && !(videoUrl || dict?.videoUrl) && (
        <Box position="absolute" inset="0" zIndex="0">
          <Image src={imageUrl || dict?.imageUrl} alt={rawTitle} fill priority style={{ objectFit: isPadded ? 'contain' : 'cover' }} sizes="(max-width: 768px) 100vw, 80vw" />
        </Box>
      )}
      {(videoUrl || dict?.videoUrl) && (
        <video src={videoUrl || dict?.videoUrl} autoPlay loop muted controls playsInline poster={imageUrl || dict?.imageUrl || undefined} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: isPadded ? 'contain' : 'cover', zIndex: 1 }} />
      )}
    </>
  )

  return (
    <SplitScreenHeroLayout
      pb={{ base: '8', md: '12' }}
      titleSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '5xl', xl: '6xl' }} 
      forceStack={isRawMedia} 
      badge={
        tags && tags.length > 0 ? (
          <Wrap justify={{ base: "center", lg: isRawMedia ? "center" : "flex-start" }} gap="2" mb="2">
            {tags.map((tag: string, i: number) => (
              <Badge key={i} size="lg" variant="subtle" colorPalette="gray" rounded="full" px="3" py="1">{tag}</Badge>
            ))}
          </Wrap>
        ) : (
          <Badge size="lg" variant="subtle" colorPalette="gray" rounded="full" px="4" py="1">
            {tagline || dict?.tagline}
          </Badge>
        )
      }
      title={
        <Highlight query={highlightQueries} styles={{ color: bgColor || "colorPalette.600", whiteSpace: 'normal' }}>
          {displayTitle}
        </Highlight>
      }
      description={description || dict?.description || 'Project description goes here.'}
      actions={
        <Stack direction={{ base: 'column', md: 'row' }} gap="4" w={{ base: "full", md: "auto" }} align={{ base: 'stretch', md: 'center' }}>
          <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" bg={bgColor || "colorPalette.600"} color="white" _hover={{ opacity: 0.85 }} onClick={handleScroll} onMouseEnter={playHover} w={{ base: "full", md: "auto" }}>
            {primaryCtaText || "Read case study"} <LuChevronDown />
          </Button>
          
          {mounted && overviewData ? (
            <Dialog.Root placement="center" motionPreset="slide-in-bottom">
              <Dialog.Trigger asChild>
                <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="gray" variant="solid" onClick={playClick} onMouseEnter={playHover} w={{ base: "full", md: "auto" }}>
                  {secondaryCtaText || "Show overview"} <LuEye />
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
                <Dialog.Positioner>
                  <Dialog.Content p={{ base: "6", md: "8" }} rounded="2xl" shadow="2xl" bg="bg.panel" color="fg.default" maxW="2xl" w="full" mx="4">
                    <Dialog.Header pb="6" display="flex" justifyContent="space-between" alignItems="center">
                      <Dialog.Title textStyle="2xl" fontWeight="bold">{l.overview}</Dialog.Title>
                      <Dialog.CloseTrigger asChild position="static" inset="auto">
                        <IconButton aria-label="Close dialog" variant="ghost" rounded="full" size="sm" onClick={playClick}><LuX /></IconButton>
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body>
                      <Stack gap="8">
                        {overviewData.summary && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="2" textTransform="uppercase" fontSize="xs" letterSpacing="widest">Summary</Text>
                            <Text fontSize="lg" lineHeight="relaxed">{overviewData.summary}</Text>
                          </Box>
                        )}
                        <Stack gap="8" direction={{ base: "column", md: "row" }} flexWrap="wrap">
                          {[{ label: l.role, val: overviewData.role }, { label: l.duration, val: overviewData.duration }, { label: l.year, val: overviewData.year }, { label: l.industry, val: overviewData.industries }, { label: 'Platforms', val: overviewData.platforms }, { label: l.users, val: overviewData.users }, { label: l.team, val: overviewData.teamRoles }].map(stat => stat.val && (
                            <Box key={stat.label} minW="150px">
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{stat.label}</Text>
                              <Text fontWeight="medium">{stat.val}</Text>
                            </Box>
                          ))}
                          {overviewData.deliverables && (
                            <Box w="full">
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.deliverables}</Text>
                              <Text fontWeight="medium">{overviewData.deliverables}</Text>
                            </Box>
                          )}
                        </Stack>
                      </Stack>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          ) : (
            <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="gray" variant="solid" w={{ base: "full", md: "auto" }}>
              {secondaryCtaText || "Show overview"} <LuEye />
            </Button>
          )}
        </Stack>
      }
    >
      <Box w="full" minW="0">
        {isPhone ? (
          <Center w="full" minW="0">
            <Box position="relative" w="full" maxW="300px" aspectRatio="422/862">
              <Box position="absolute" inset="2.2% 5.2% 2.2% 5.2%" borderRadius="3xl" overflow="hidden" bg="black" zIndex="0"><MediaContent /></Box>
              <Box position="relative" h="full" w="full" zIndex="1" pointerEvents="none">
                <Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup-optimized.png" alt={`${normalizedMockup} mockup`} fill priority unoptimized={true} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
              </Box>
            </Box>
          </Center>
        ) : (
          <Box 
            maxW={isRawMedia ? "5xl" : "full"} 
            mx="auto" 
            w="full" 
            minW="0" 
            position="relative" 
            borderRadius="l3" 
            overflow="hidden" 
            borderWidth="1px" 
            borderColor="border.subtle" 
            bg={bgColor || "bg.muted"} 
            shadow="md" 
            aspectRatio={{ base: "4/3", md: "16/9" }}
          >
            {isTablet ? (
              <Center position="absolute" inset="0" p={{ base: '8', md: '16' }} zIndex="0">
                <Box position="relative" h="full" w="full" display="flex" justifyContent="center" alignItems="center">
                  <Box position="relative" h="full" aspectRatio="1106/814">
                    <Box position="absolute" inset="4.8% 4.2%" borderRadius="sm" overflow="hidden" bg="black" zIndex="0"><MediaContent /></Box>
                    <Box position="relative" h="full" w="auto" aspectRatio="1106/814" zIndex="1">
                      <Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/ipad-mockup-optimized.png" alt={`${normalizedMockup} mockup`} fill priority unoptimized={true} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
                    </Box>
                  </Box>
                </Box>
              </Center>
            ) : isPadded ? (
              <Box position="absolute" inset="0" p={{ base: '8', md: '12', lg: '16' }}><Box position="relative" w="full" h="full" minW="0"><MediaContent /></Box></Box>
            ) : (
              <Box position="absolute" inset="0" zIndex="0" minW="0"><MediaContent /></Box>
            )}
          </Box>
        )}
      </Box>
    </SplitScreenHeroLayout>
  )
}