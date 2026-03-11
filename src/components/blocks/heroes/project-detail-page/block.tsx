'use client'

import { Badge, Box, Button, Center, Heading, Stack, Text, VStack, Dialog, SimpleGrid, Portal, IconButton, Highlight, Wrap } from '@chakra-ui/react'
import { LuChevronDown, LuEye, LuX } from 'react-icons/lu'
import Image from 'next/image'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useMemo, useState } from 'react'

interface OverviewData {
  role?: string | null;
  duration?: string | null;
  year?: string | number | null;
  teamRoles?: string | null;
  users?: string | null;
  deliverables?: string | null;
  summary?: string | null;
  industries?: string | null;
  platforms?: string | null;
  labels?: Record<string, string>;
}

interface HeroProps {
  dict?: any;
  title?: string;
  description?: string;
  tagline?: string;
  tags?: string[];
  imageUrl?: string | null;
  videoUrl?: string | null;
  mockupType?: string | null;
  bgColor?: string | null; 
  primaryCtaText?: string;
  secondaryCtaText?: string;
  primaryScrollTo?: string;
  isProtected?: boolean;
  overviewData?: OverviewData;
}

export const Block = ({ 
  dict, title, description, tagline, tags, imageUrl, videoUrl, mockupType, bgColor,
  primaryCtaText, secondaryCtaText, primaryScrollTo = 'outcomes', isProtected = false,
  overviewData
}: HeroProps) => {
  const { playClick, playHover } = useUiSounds()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const handleScroll = () => {
    playClick()
    const element = document.getElementById(isProtected ? 'unlock-section' : primaryScrollTo)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const rawTitle = title || dict?.title || 'Project title'
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const finalTagline = tagline || dict?.tagline;
  const finalDescription = description || dict?.description || 'Project description goes here.';
  const finalImageUrl = imageUrl || dict?.imageUrl;
  const finalVideoUrl = videoUrl || dict?.videoUrl;
  const finalMockupType = mockupType || dict?.mockupType;

  const l = overviewData?.labels || {
    role: "Role", duration: "Duration", team: "Team", users: "Users", 
    deliverables: "Deliverables", year: "Year", industry: "Industry", overview: "Project Overview"
  };

  const normalizedMockupType = finalMockupType?.toString().toLowerCase().trim()
  const isTablet = normalizedMockupType === 'tablet' || normalizedMockupType === 'ipad'
  const isPhone = normalizedMockupType === 'phone' || normalizedMockupType === 'mobile' || normalizedMockupType === 'iphone'
  const isBrowser = normalizedMockupType === 'browser' || normalizedMockupType === 'desktop' || normalizedMockupType === 'macbook'
  const isPadded = normalizedMockupType === 'padded'

  const MediaContent = () => (
    <>
      {finalImageUrl && !finalVideoUrl && (
        <Box position="absolute" inset="0" zIndex="0">
          <Image
            src={finalImageUrl}
            alt={rawTitle || "Project media"}
            fill
            priority
            style={{ objectFit: isPadded ? 'contain' : 'cover' }}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </Box>
      )}

      {finalVideoUrl && (
        <video
          src={finalVideoUrl}
          autoPlay
          loop
          muted
          controls
          playsInline
          poster={finalImageUrl || undefined}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: isPadded ? 'contain' : 'cover', 
            zIndex: 1 
          }}
        />
      )}
    </>
  )

  return (
    <VStack gap={{ base: '8', md: '12' }} textAlign="center" w="full" pt={{ base: '32', md: '40' }} pb={{ base: '8', md: '12' }}>
      <Stack gap="6" align="center" px={{ base: '4', md: '8' }} maxW="4xl" mx="auto">
        
        {tags && tags.length > 0 ? (
          <Wrap justify="center" gap="2" mb="2">
            {tags.map((tag, i) => (
              <Badge key={i} size="lg" variant="subtle" colorPalette="gray" rounded="full" px="3" py="1">
                {tag}
              </Badge>
            ))}
          </Wrap>
        ) : finalTagline && (
          <Badge size="lg" variant="subtle" colorPalette="gray" alignSelf="center" rounded="full" px="4" py="1">
            {finalTagline}
          </Badge>
        )}
        
        <Heading
          as="h1"
          textStyle={{ base: '5xl', md: '6xl', lg: '7xl' }}
          lineHeight={{ base: '1.2', md: '1.1' }}
          fontWeight="bold"
          letterSpacing="tight"
        >
          {/* FIX: Restored the dynamic bgColor so the highlight matches the project's unique brand color */}
          <Highlight query={highlightQueries} styles={{ color: bgColor || "green.600" }}>
            {displayTitle}
          </Highlight>
        </Heading>
        
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl" mx="auto">
          {finalDescription}
        </Text>

        <Stack align="center" direction={{ base: 'column', md: 'row' }} gap="4" mt="4" w={{ base: 'full', md: 'auto' }}>
          <Button 
            size="xl" 
            h={{ base: 14, md: 16 }}
            px={{ base: 6, md: 8 }}
            fontSize="lg"
            bg={bgColor || "green.600"} 
            color="white"
            _hover={{ opacity: 0.85 }} 
            onClick={handleScroll} 
            onMouseEnter={playHover}
            w={{ base: 'full', md: 'auto' }}
          >
            {primaryCtaText || "Read case study"} <LuChevronDown />
          </Button>

          {mounted && overviewData ? (
            <Dialog.Root placement="center" motionPreset="slide-in-bottom">
              <Dialog.Trigger asChild>
                <Button 
                  size="xl" 
                  h={{ base: 14, md: 16 }}
                  px={{ base: 6, md: 8 }}
                  fontSize="lg"
                  colorPalette="gray" 
                  variant="solid" 
                  onClick={playClick} 
                  onMouseEnter={playHover}
                  w={{ base: 'full', md: 'auto' }}
                >
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
                        <IconButton 
                          aria-label="Close dialog"
                          variant="ghost" 
                          rounded="full" 
                          size="sm" 
                          onClick={playClick}
                        >
                          <LuX />
                        </IconButton>
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
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                          {overviewData.role && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.role}</Text>
                              <Text fontWeight="medium">{overviewData.role}</Text>
                            </Box>
                          )}
                          {overviewData.duration && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.duration}</Text>
                              <Text fontWeight="medium">{overviewData.duration}</Text>
                            </Box>
                          )}
                          {overviewData.year && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.year}</Text>
                              <Text fontWeight="medium">{overviewData.year}</Text>
                            </Box>
                          )}
                          {overviewData.industries && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.industry}</Text>
                              <Text fontWeight="medium">{overviewData.industries}</Text>
                            </Box>
                          )}
                          {overviewData.platforms && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Platforms</Text>
                              <Text fontWeight="medium">{overviewData.platforms}</Text>
                            </Box>
                          )}
                          {overviewData.users && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.users}</Text>
                              <Text fontWeight="medium">{overviewData.users}</Text>
                            </Box>
                          )}
                          {overviewData.teamRoles && (
                            <Box>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.team}</Text>
                              <Text fontWeight="medium">{overviewData.teamRoles}</Text>
                            </Box>
                          )}
                          {overviewData.deliverables && (
                            <Box gridColumn={{ md: "span 2" }}>
                              <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">{l.deliverables}</Text>
                              <Text fontWeight="medium">{overviewData.deliverables}</Text>
                            </Box>
                          )}
                        </SimpleGrid>
                      </Stack>
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          ) : (
            <Button 
              size="xl" 
              h={{ base: 14, md: 16 }}
              px={{ base: 6, md: 8 }}
              fontSize="lg"
              colorPalette="gray" 
              variant="solid" 
              w={{ base: 'full', md: 'auto' }}
            >
              {secondaryCtaText || "Show overview"} <LuEye />
            </Button>
          )}

        </Stack>
      </Stack>

      <Box w="full" px={{ base: '4', md: '8' }} mt={{ base: 4, md: 8 }}>
        {isPhone ? (
          <Center w="full">
            <Box position="relative" w="full" maxW="300px" aspectRatio="422/862">
              <Box position="absolute" inset="2.2% 5.2% 2.2% 5.2%" borderRadius="3xl" overflow="hidden" bg="black" zIndex="0">
                <MediaContent />
              </Box>
              <Box position="relative" h="full" w="full" zIndex="1" pointerEvents="none">
                <Image
                  src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup-optimized.png"
                  alt={`${normalizedMockupType} mockup`}
                  fill
                  priority
                  unoptimized={true}
                  style={{ objectFit: 'contain', pointerEvents: 'none' }}
                />
              </Box>
            </Box>
          </Center>
        ) : (
          <Box 
            maxW={isBrowser ? "6xl" : "5xl"} 
            mx="auto" 
            w="full" 
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
                    <Box position="absolute" inset="4.8% 4.2%" borderRadius="sm" overflow="hidden" bg="black" zIndex="0">
                      <MediaContent />
                    </Box>
                    <Box position="relative" h="full" w="auto" aspectRatio="1106/814" zIndex="1">
                      <Image
                        src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/ipad-mockup-optimized.png"
                        alt={`${normalizedMockupType} mockup`}
                        fill
                        priority
                        unoptimized={true}
                        style={{ objectFit: 'contain', pointerEvents: 'none' }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Center>
            ) : isPadded ? (
              <Box position="absolute" inset="0" p={{ base: '8', md: '12', lg: '16' }}>
                 <Box position="relative" w="full" h="full">
                   <MediaContent />
                 </Box>
              </Box>
            ) : (
              <Box position="absolute" inset="0" zIndex="0">
                <MediaContent />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </VStack>
  )
}