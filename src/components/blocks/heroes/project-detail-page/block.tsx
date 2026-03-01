'use client'

import { 
  Badge, 
  Box, 
  Button, 
  Flex, 
  Image, 
  Stack, 
  chakra, 
  Highlight,
  Dialog,
  Portal,
  IconButton,
  Heading,
  Text,
  Skeleton,
  SimpleGrid
} from '@chakra-ui/react'
import { LuArrowDown, LuX, LuEye, LuLock } from 'react-icons/lu'
import { HeroHeader } from '../home-page/hero-header'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo } from 'react'

const Video = chakra('video')

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <Box position="relative" mx="auto" width="300px" height="600px" zIndex={1}>
    <Image
      src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup.png"
      alt="iPhone Mockup"
      position="absolute"
      inset="0"
      width="100%"
      height="100%"
      objectFit="contain"
      zIndex={10}
      pointerEvents="none"
    />
    <Box 
      position="absolute"
      top="1.8%"    
      bottom="1.8%" 
      left="5%" 
      right="5%"
      borderRadius="3rem" 
      overflow="hidden"
      zIndex={1}
      bg="black"
    >
      {children}
    </Box>
  </Box>
)

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return ""
  if (url.includes("youtube.com/embed/")) return url

  let videoId = ""
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0]
  } else if (url.includes("youtube.com/watch")) {
    try {
      const urlParams = new URL(url).searchParams
      videoId = urlParams.get("v") || ""
    } catch (e) {
      // Ignore parsing errors
    }
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

interface ProjectHeroProps {
  dict?: any
  title?: string
  description?: string
  tagline?: string 
  videoUrl?: string
  imageUrl?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  primaryScrollTo?: string
  bgColor?: string
  mockupType?: string 
  isProtected?: boolean
  overviewData?: {
    role?: string;
    duration?: string;
    teamRoles?: string;
    deliverables?: string;
    summary?: string;
    year?: string;
    industries?: string;
    labels?: {
      role?: string;
      duration?: string;
      team?: string;
      deliverables?: string;
      year?: string;
      industry?: string;
      overview?: string;
    }
  }
}

export const Block = ({ 
  dict,
  title,
  description,
  tagline = "Case Study", 
  videoUrl, 
  imageUrl,
  primaryCtaText,
  secondaryCtaText,
  primaryScrollTo = "outcomes",
  bgColor,
  mockupType, 
  isProtected,
  overviewData
}: ProjectHeroProps) => {
  const { playHover, playClick } = useUiSounds()

  const rawTitle = title || dict?.title || ""
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const scrollToPrimary = () => {
    playClick()
    const targetId = isProtected ? 'unlock-section' : primaryScrollTo
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const isPhoneMockup = mockupType?.toLowerCase() === 'iphone' || mockupType?.toLowerCase() === 'phone';

  const renderMediaContent = (isPhone: boolean) => {
    const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be')
    const finalVideoUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl!) : videoUrl

    // 1. Phone Render
    if (isPhone) {
      return (
        <Box w="full" maxW="300px" mx="auto">
          <PhoneFrame>
            <Box w="full" h="full" position="absolute" inset="0" bg="black">
              {isYouTube ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={finalVideoUrl}
                  title="Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              ) : videoUrl ? (
                <Video 
                   src={videoUrl} 
                   poster={imageUrl} 
                   autoPlay muted loop controls playsInline 
                   objectFit="cover" width="100%" height="100%" position="absolute" inset="0" 
                 />
              ) : (
                <Image src={imageUrl} alt="Project Preview" objectFit="contain" width="100%" height="100%" position="absolute" inset="0" />
              )}
            </Box>
          </PhoneFrame>
        </Box>
      )
    }

    // 2. Pure Browser Render
    if (isYouTube) {
      return (
        <Box w="full" position="relative" aspectRatio={16/9}>
          <iframe
            width="100%"
            height="100%"
            src={finalVideoUrl}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </Box>
      )
    }

    if (videoUrl) {
      return (
        <Video 
          src={videoUrl} 
          poster={imageUrl} 
          autoPlay 
          muted 
          loop 
          controls
          playsInline 
          w="full" 
          h="auto"
        />
      )
    }

    return (
      <Image 
        src={imageUrl} 
        alt="Project Preview" 
        w="full" 
        h="auto" 
        objectFit="contain" 
      />
    )
  }

  return (
    <Box position="relative" w="full" overflow="hidden">
      <Stack 
        direction={{ base: 'column', lg: 'row' }} 
        w="full"
        minH={{ base: 'auto', lg: '100vh' }} 
        alignItems="stretch" 
        gap="0" 
      >
        
        {/* LEFT COLUMN: Text and CTA */}
        <Flex
          flex="1"
          align="center"
          justify={{ base: "center", lg: "flex-end" }}
          pt={{ base: '32', md: '40' }} 
          pb={{ base: '12', lg: '32' }} 
          zIndex="1"
        >
          <Box w="full" maxW={{ lg: "calc(var(--chakra-sizes-7xl) / 2)" }} px={{ base: 4, md: 8 }} pr={{ lg: 12 }}>
            <HeroHeader
              tagline={
                <Box width="fit-content" mx={{ base: 'auto', lg: '0' }}>
                  <Badge 
                    size="lg" 
                    colorPalette="gray" 
                    variant="subtle" 
                    px="3" 
                    py="1" 
                    borderRadius="full"
                    cursor="default"
                  >
                    {tagline}
                  </Badge>
                </Box>
              }
              headline={
                <Highlight 
                  query={highlightQueries} 
                  styles={{ color: "green.600" }}
                >
                  {displayTitle}
                </Highlight>
              }
              description={description || dict?.description}
              alignItems={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "start" }}
            >
              <Stack gap="6" mt="2" alignItems={{ base: "center", lg: "flex-start" }} w="full">
                
                <Stack direction={{ base: 'column', md: 'row' }} gap="4" w={{ base: "full", md: "auto" }}>
                  <Button 
                    size="xl" 
                    h={{ base: 14, md: 16 }}
                    px={{ base: 6, md: 8 }}
                    fontSize="lg"
                    onClick={scrollToPrimary} 
                    onMouseEnter={playHover} 
                    w={{ base: "full", md: "auto" }}
                    bg={bgColor || "bg.emphasized"}
                    color={bgColor ? "white" : "fg.default"}
                    _hover={bgColor ? { opacity: 0.9, transform: "translateY(-1px)", shadow: "md" } : { bg: "bg.muted" }}
                  >
                    {isProtected ? "Unlock case study" : (primaryCtaText || "Read case study")} 
                    {isProtected ? <LuLock /> : <LuArrowDown />} 
                  </Button>
                  
                  <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                      <Button 
                        variant="solid" 
                        colorPalette="gray"
                        size="xl" 
                        h={{ base: 14, md: 16 }}
                        px={{ base: 6, md: 8 }}
                        fontSize="lg"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        w={{ base: "full", md: "auto" }}
                      >
                        {secondaryCtaText || "Show overview"} <LuEye />
                      </Button>
                    </Dialog.Trigger>
                    
                    <Portal>
                      <Dialog.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />
                      <Dialog.Positioner>
                        <Dialog.Content bg="bg.panel" shadow="2xl" maxW="xl" w="full" mx="4" rounded="3xl" p={{ base: 6, md: 8 }}>
                          <Dialog.CloseTrigger asChild position="absolute" top="4" right="4">
                            <IconButton aria-label="Close" variant="ghost" rounded="full" onClick={playClick}>
                              <LuX />
                            </IconButton>
                          </Dialog.CloseTrigger>
                          <Stack gap="8" pt="2">
                            <Heading size="2xl" color="fg.default">{overviewData?.labels?.overview || "Project Overview"}</Heading>
                            {overviewData?.summary && (
                              <Text color="fg.muted" fontSize="lg" lineHeight="relaxed">
                                {overviewData.summary}
                              </Text>
                            )}
                            <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                              {overviewData?.role && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.role || "Role"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.role}</Text>
                                </Box>
                              )}
                              {overviewData?.duration && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.duration || "Duration"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.duration}</Text>
                                </Box>
                              )}
                              {overviewData?.teamRoles && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.team || "Team"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.teamRoles}</Text>
                                </Box>
                              )}
                              {overviewData?.deliverables && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.deliverables || "Deliverables"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.deliverables}</Text>
                                </Box>
                              )}
                              {overviewData?.year && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.year || "Year"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.year}</Text>
                                </Box>
                              )}
                              {overviewData?.industries && (
                                <Box>
                                  <Text fontWeight="semibold" color="fg.default" mb="1">{overviewData?.labels?.industry || "Industry"}</Text>
                                  <Text color="fg.muted" fontSize="sm">{overviewData.industries}</Text>
                                </Box>
                              )}
                            </SimpleGrid>
                          </Stack>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Stack>
              </Stack>
            </HeroHeader>
          </Box>
        </Flex>
        
        {/* RIGHT COLUMN: Media Block */}
        <Flex 
          flex="1"
          align="center" 
          justify={isPhoneMockup ? { base: "center", lg: "flex-start" } : "center"} 
          position="relative" 
          py={{ base: 12, lg: 16 }} 
          px={{ base: 4, md: 8, lg: isPhoneMockup ? 12 : 8 }} 
          zIndex="0"
        >
          <Box 
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
            bg={bgColor || "bg.muted"}
            zIndex="-1"
          />

          <Box 
            w="full" 
            maxW={isPhoneMockup ? { lg: "calc(var(--chakra-sizes-7xl) / 2)" } : "100%"}
            mx="auto"
          >
            {videoUrl || imageUrl ? (
               renderMediaContent(isPhoneMockup)
            ) : (
              <Skeleton w="full" minH={{ base: '96', lg: '3xl' }} height="100%" borderRadius="3xl" />
            )}
          </Box>
        </Flex>

      </Stack>
    </Box>
  )
}