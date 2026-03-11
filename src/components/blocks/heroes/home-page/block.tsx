'use client'

import { Badge, Box, Button, Center, Icon, Stack, chakra, Dialog, Portal, IconButton, HStack, Text, Avatar, Skeleton, VStack } from '@chakra-ui/react'
import { LuPlay, LuArrowDown, LuUser, LuX } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa' 
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import { SplitScreenHeroLayout } from '../split-screen-hero-layout/block'

const Video = chakra('video')

const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
  <Box position="relative" mx="auto" width="300px" height="600px" zIndex={1}>
    <Image src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup.png" alt="iPhone Mockup" fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 300px" priority className="z-10 pointer-events-none" />
    <Box position="absolute" top="1.8%" bottom="1.8%" left="5%" right="5%" borderRadius="3rem" overflow="hidden" zIndex={1} bg="black">
      {children}
    </Box>
  </Box>
)

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return ""
  if (url.includes("youtube.com/embed/")) return url
  let videoId = ""
  if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0]
  else if (url.includes("youtube.com/watch")) {
    try { videoId = new URL(url).searchParams.get("v") || "" } catch (e) {}
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

interface BlockProps {
  dict?: any; title?: string; description?: string; tagline?: string; videoUrl?: string; imageUrl?: string; introVideoUrl?: string;
}

export const Block = ({ dict, title, description, tagline, videoUrl, imageUrl, introVideoUrl }: BlockProps) => {
  const pathname = usePathname()
  const { playHover, playClick } = useUiSounds()
  const [avatars, setAvatars] = useState<string[]>([])
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(true)
  const [mounted, setMounted] = useState(false) 

  const segments = pathname?.split('/').filter(Boolean) || []
  const currentLocale = segments.length > 0 && segments[0].length === 2 ? segments[0] : 'en'
  const aboutUrl = `/${currentLocale}/about`

  const rawTitle = title || dict?.title || ""
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    return { displayTitle: rawTitle.replace(/\*/g, ''), highlightQueries: queries }
  }, [rawTitle])

  useEffect(() => {
    setMounted(true) 
    const fetchAvatars = async () => {
      setIsLoadingAvatars(true)
      const { data } = await supabase.from('testimonials').select('avatar_url').not('avatar_url', 'is', null).limit(5)
      if (data) setAvatars(data.map(t => t.avatar_url).filter(Boolean) as string[])
      setIsLoadingAvatars(false)
    }
    fetchAvatars()
  }, [])

  const finalIntroVideoUrl = getYouTubeEmbedUrl(introVideoUrl || dict?.introVideoUrl || "")
  const displayTagline = tagline || dict?.tagline;
  const displaySocialProof = dict?.socialProof;
  
  const scrollTo = (id: string) => {
    playClick()
    const element = document.getElementById(id)
    if (element) window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  return (
    <SplitScreenHeroLayout
      badge={
        displayTagline ? (
          <Link href={aboutUrl} onClick={playClick} onMouseEnter={playHover}>
            <Badge size="lg" colorPalette="gray" variant="subtle" px="3" py="1" borderRadius="full" cursor="pointer" transition="all 0.2s" _hover={{ bg: "bg.emphasized", transform: "translateY(-1px)" }}>
              <Icon size="sm" mr="1"><LuUser /></Icon>{displayTagline}
            </Badge>
          </Link>
        ) : null
      }
      title={displayTitle}
      highlightQueries={highlightQueries}
      description={description || dict?.description}
      pb={{ base: '8', lg: '24' }}
      actions={
        <VStack gap="6" w="full" align={{ base: "center", lg: "flex-start" }}>
          {/* FIX: align stretch guarantees full-width buttons on mobile, centering handles desktop row */}
          <Stack direction={{ base: 'column', md: 'row' }} gap="4" w={{ base: "full", md: "auto" }} align={{ base: 'stretch', md: 'center' }}>
            <Button size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" onClick={() => scrollTo('projects')} onMouseEnter={playHover} w={{ base: "full", md: "auto" }}>
              {dict?.exploreWork} <LuArrowDown /> 
            </Button>
            
            {mounted && finalIntroVideoUrl ? (
              <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                <Dialog.Trigger asChild>
                  <Button variant="solid" size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="gray" onClick={playClick} onMouseEnter={playHover} w={{ base: "full", md: "auto" }}>
                    {dict?.watchIntro} <LuPlay />
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />
                  <Dialog.Positioner>
                    <Dialog.Content bg="transparent" shadow="none" maxW="4xl" w="full" mx="4">
                      <Dialog.CloseTrigger asChild position="absolute" top={{ base: "-12", md: "-12" }} right="0">
                        <IconButton aria-label="Close video" variant="ghost" color="white" _hover={{ bg: "whiteAlpha.200" }} rounded="full" onClick={playClick}><LuX /></IconButton>
                      </Dialog.CloseTrigger>
                      <Dialog.Body p="0" rounded="2xl" overflow="hidden" bg="black" shadow="2xl">
                        <Box aspectRatio={16 / 9} w="full">
                          <iframe width="100%" height="100%" src={finalIntroVideoUrl} title="Introduction Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </Box>
                      </Dialog.Body>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            ) : finalIntroVideoUrl ? (
              <Button variant="solid" size="xl" h={{ base: 14, md: 16 }} px={{ base: 6, md: 8 }} fontSize="lg" colorPalette="gray" w={{ base: "full", md: "auto" }}>
                {dict?.watchIntro} <LuPlay />
              </Button>
            ) : null}
          </Stack>

          {displaySocialProof && (
            <HStack gap="3" onClick={() => scrollTo('testimonials')} onMouseEnter={playHover} cursor="pointer" transition="all 0.2s" _hover={{ opacity: 0.8 }} h="10">
              {isLoadingAvatars ? (
                <HStack gap="-2" me="1" w="20">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box key={`skeleton-${i}`} borderWidth="2px" borderColor="bg.panel" rounded="full" zIndex={10 - i}>
                      <Skeleton width="32px" height="32px" borderRadius="full" />
                    </Box>
                  ))}
                </HStack>
              ) : avatars.length > 0 ? (
                <HStack gap="-2" me="1" w="auto">
                  {avatars.map((src, i) => (
                    <Box key={i} borderWidth="2px" borderColor="bg.panel" rounded="full" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", zIndex: 10 }}>
                      <Avatar.Root size="sm"><Avatar.Image src={src} /><Avatar.Fallback name={`User ${i + 1}`} /></Avatar.Root>
                    </Box>
                  ))}
                </HStack>
              ) : null}
              <Stack gap="0" pt="1">
                <HStack gap="0.5" color="yellow.400">
                  {[1, 2, 3, 4, 5].map(i => <FaStar key={i} size="12px" />)}
                </HStack>
                <Text fontSize="sm" color="fg.muted" fontWeight="medium">{displaySocialProof}</Text>
              </Stack>
            </HStack>
          )}
        </VStack>
      }
    >
      <Center w="full">
        {videoUrl || imageUrl ? (
          <PhoneFrame>
            {videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be') ? (
              <iframe width="100%" height="100%" src={videoUrl} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            ) : videoUrl ? (
              <Video src={videoUrl} poster={imageUrl} autoPlay muted loop controls playsInline objectFit="cover" width="100%" height="100%" />
            ) : (
              <Box position="relative" width="100%" height="100%">
                <Image src={imageUrl || ""} alt="App Screen" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 300px" priority />
              </Box>
            )}
          </PhoneFrame>
        ) : (
          <Box width="full" maxW="lg" px="8">
             <Skeleton w="full" minH={{ base: '96', lg: '3xl' }} height="100%" borderRadius="3xl" />
          </Box>
        )}
      </Center>
    </SplitScreenHeroLayout>
  )
}