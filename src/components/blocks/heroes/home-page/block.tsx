'use client'

import { 
  Badge, 
  Box, 
  Button, 
  Flex, 
  Icon, 
  Image, 
  SimpleGrid, 
  Stack, 
  chakra, 
  Highlight,
  Dialog,
  Portal,
  IconButton,
  HStack,
  Text,
  Avatar,
  Skeleton,
  Heading
} from '@chakra-ui/react'
import { LuPlay, LuArrowDown, LuUser, LuX, LuEye } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa' 
import { HeroHeader } from './hero-header'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'

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

interface BlockProps {
  dict?: any
  title?: string
  description?: string
  tagline?: string 
  videoUrl?: string
  imageUrl?: string
  introVideoUrl?: string
  primaryCtaText?: string
  secondaryCtaText?: string
  primaryScrollTo?: string
  secondaryScrollTo?: string
  hideSocialProof?: boolean
  showOverview?: boolean
  bgColor?: string // ADDED BG COLOR PROP
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
  tagline = "Senior Product Designer in Minneapolis", 
  videoUrl, 
  imageUrl,
  introVideoUrl,
  primaryCtaText,
  secondaryCtaText,
  primaryScrollTo = "projects",
  secondaryScrollTo,
  hideSocialProof = false,
  showOverview = false,
  bgColor,
  overviewData
}: BlockProps) => {
  const pathname = usePathname()
  const { playHover, playClick } = useUiSounds()
  const [avatars, setAvatars] = useState<string[]>([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(true)

  const segments = pathname?.split('/').filter(Boolean) || []
  const currentLocale = segments.length > 0 && segments[0].length === 2 ? segments[0] : 'en'
  const aboutUrl = `/${currentLocale}/about`

  const rawTitle = title || dict?.title || ""
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  useEffect(() => {
    if (hideSocialProof) {
      setIsLoadingAvatars(false)
      return
    }

    const fetchAvatars = async () => {
      setIsLoadingAvatars(true)
      const { data } = await supabase
        .from('testimonials')
        .select('avatar_url')
        .not('avatar_url', 'is', null)
        .limit(5)
      
      if (data) {
        setAvatars(data.map(t => t.avatar_url).filter(Boolean) as string[])
      }
      setIsLoadingAvatars(false)
    }
    fetchAvatars()
  }, [hideSocialProof])

  const rawVideoUrl = introVideoUrl || dict?.introVideoUrl || "https://youtu.be/FbF0OMghl-o"
  const finalIntroVideoUrl = getYouTubeEmbedUrl(rawVideoUrl)
  
  const scrollToPrimary = () => {
    playClick()
    const element = document.getElementById(primaryScrollTo)
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const scrollToSecondary = () => {
    playClick()
    const element = document.getElementById(secondaryScrollTo!)
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const scrollToTestimonials = () => {
    playClick()
    const element = document.getElementById('testimonials')
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const BadgeContent = (
    <Badge 
      size="lg" 
      colorPalette="gray" 
      variant="subtle" 
      px="3" 
      py="1" 
      borderRadius="full"
      cursor={hideSocialProof ? "default" : "pointer"}
      transition="all 0.2s"
      _hover={hideSocialProof ? {} : { bg: "bg.emphasized", transform: "translateY(-1px)" }}
    >
      {!hideSocialProof && (
        <Icon size="sm" mr="1">
          <LuUser />
        </Icon>
      )}
      {tagline}
    </Badge>
  )

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 0 }}>
      <Flex
        align="center"
        justify="center"
        w="full"
        pe={{ base: '0', lg: '12' }} 
        pt={{ base: '32', md: '40' }} 
        pb={{ base: '8', lg: '24' }} 
      >
        <HeroHeader
          tagline={
            <Box width="fit-content" mx={{ base: 'auto', lg: '0' }}>
              {hideSocialProof ? (
                BadgeContent
              ) : (
                <Link href={aboutUrl} onClick={playClick} onMouseEnter={playHover}>
                  {BadgeContent}
                </Link>
              )}
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
                bg={bgColor || undefined}
                color={bgColor ? "white" : undefined}
                _hover={bgColor ? { opacity: 0.9, transform: "translateY(-1px)", shadow: "sm" } : undefined}
              >
                {primaryCtaText || dict?.exploreWork || "Explore work"} <LuArrowDown /> 
              </Button>
              
              {showOverview ? (
                <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                  <Dialog.Trigger asChild>
                    <Button 
                      variant="solid" 
                      size="xl" 
                      h={{ base: 14, md: 16 }}
                      px={{ base: 6, md: 8 }}
                      fontSize="lg"
                      colorPalette="gray" 
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
                          <SimpleGrid columns={2} gap="6">
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
              ) : secondaryScrollTo ? (
                <Button 
                  variant="solid" 
                  size="xl" 
                  h={{ base: 14, md: 16 }}
                  px={{ base: 6, md: 8 }}
                  fontSize="lg"
                  colorPalette="gray" 
                  onClick={scrollToSecondary}
                  onMouseEnter={playHover}
                  w={{ base: "full", md: "auto" }}
                >
                  {secondaryCtaText || dict?.watchIntro || "Watch Intro"} <LuArrowDown />
                </Button>
              ) : (
                <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                  <Dialog.Trigger asChild>
                    <Button 
                      variant="solid" 
                      size="xl" 
                      h={{ base: 14, md: 16 }}
                      px={{ base: 6, md: 8 }}
                      fontSize="lg"
                      colorPalette="gray" 
                      onClick={playClick}
                      onMouseEnter={playHover}
                      w={{ base: "full", md: "auto" }}
                    >
                      {secondaryCtaText || dict?.watchIntro || "Watch Intro"} <LuPlay />
                    </Button>
                  </Dialog.Trigger>
                  
                  <Portal>
                    <Dialog.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />
                    <Dialog.Positioner>
                      <Dialog.Content bg="transparent" shadow="none" maxW="4xl" w="full" mx="4">
                        <Dialog.CloseTrigger asChild position="absolute" top={{ base: "-12", md: "-12" }} right="0">
                          <IconButton aria-label="Close video" variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} rounded="full" onClick={playClick}>
                            <LuX />
                          </IconButton>
                        </Dialog.CloseTrigger>
                        <Dialog.Body p="0" rounded="2xl" overflow="hidden" bg="black" shadow="2xl">
                          <Box aspectRatio={16 / 9} w="full">
                            <iframe
                              width="100%"
                              height="100%"
                              src={finalIntroVideoUrl}
                              title="Introduction Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </Box>
                        </Dialog.Body>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              )}
            </Stack>

            {!hideSocialProof && (
              <HStack 
                gap="3" 
                onClick={scrollToTestimonials}
                onMouseEnter={playHover}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ opacity: 0.8 }}
                h="10"
              >
                {isLoadingAvatars ? (
                  <HStack gap="-2" me="1" w="20">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Box 
                        key={`skeleton-${i}`} 
                        borderWidth="2px" 
                        borderColor="bg.panel" 
                        rounded="full"
                        zIndex={10 - i}
                      >
                        <Skeleton width="32px" height="32px" borderRadius="full" />
                      </Box>
                    ))}
                  </HStack>
                ) : avatars.length > 0 ? (
                  <HStack gap="-2" me="1" w="auto">
                    {avatars.map((src, i) => (
                      <Box 
                        key={i} 
                        borderWidth="2px" 
                        borderColor="bg.panel" 
                        rounded="full"
                        transition="all 0.2s"
                        _hover={{ transform: "translateY(-4px)", zIndex: 10 }}
                      >
                        <Avatar.Root size="sm">
                          <Avatar.Image src={src} />
                          <Avatar.Fallback name={`User ${i + 1}`} />
                        </Avatar.Root>
                      </Box>
                    ))}
                  </HStack>
                ) : null}
                <Stack gap="0" pt="1">
                  <HStack gap="0.5" color="yellow.400">
                    <FaStar size="12px" />
                    <FaStar size="12px" />
                    <FaStar size="12px" />
                    <FaStar size="12px" />
                    <FaStar size="12px" />
                  </HStack>
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                    {dict?.socialProof || "Trusted by product teams"}
                  </Text>
                </Stack>
              </HStack>
            )}

          </Stack>
        </HeroHeader>
      </Flex>
      
      <Flex 
        align="center" 
        justify="center" 
        minH={{ base: 'auto', lg: '3xl' }} 
        pt={{ base: 8, lg: 0 }}
        pb={{ base: 12, lg: 0 }}
      >
        {videoUrl || imageUrl ? (
          <PhoneFrame>
            {videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be') ? (
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            ) : videoUrl ? (
              <Video src={videoUrl} poster={imageUrl} autoPlay muted loop controls playsInline objectFit="cover" width="100%" height="100%" />
            ) : (
              <Image src={imageUrl} alt="App Screen" objectFit="cover" width="100%" height="100%" />
            )}
          </PhoneFrame>
        ) : (
          <Box width="full" maxW="lg" px="8">
             <Skeleton w="full" minH={{ base: '96', lg: '3xl' }} height="100%" borderRadius="3xl" />
          </Box>
        )}
      </Flex>
    </SimpleGrid>
  )
}