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
  Avatar
} from '@chakra-ui/react'
import { LuPlay, LuArrowDown, LuUser, LuX } from 'react-icons/lu'
import { FaStar } from 'react-icons/fa' 
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'
import Link from 'next/link'
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

interface BlockProps {
  dict?: any
  title?: string
  description?: string
  tagline?: string 
  videoUrl?: string
  imageUrl?: string
  introVideoUrl?: string
}

export const Block = ({ 
  dict,
  title = "Design *Better Products*",
  description = "I help early-stage founders and small business owners design better products, services, and customer experiences.",
  tagline = "Senior Product Designer in Minneapolis", 
  videoUrl, 
  imageUrl,
  introVideoUrl
}: BlockProps) => {
  const { playHover, playClick } = useUiSounds()
  const [avatars, setAvatars] = useState<string[]>([])

  // Helper to extract highlighted text from markers like *text*
  // This makes it so you don't have to manage a list of strings in code
  const { displayTitle, highlightQueries } = useMemo(() => {
    const rawTitle = title || ""
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map(m => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [title])

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('avatar_url')
        .not('avatar_url', 'is', null)
        .limit(5)
      
      if (data) {
        setAvatars(data.map(t => t.avatar_url).filter(Boolean) as string[])
      }
    }
    fetchAvatars()
  }, [])

  const finalIntroVideoUrl = introVideoUrl || dict?.introVideoUrl || "https://www.youtube.com/embed/fnK-KIB3H44"
  
  const scrollToProjects = () => {
    playClick()
    const element = document.getElementById('projects')
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    const element = document.getElementById('about')
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      window.history.pushState(null, '', '#about')
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

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 0 }}>
      <Flex
        align="center"
        justify="center"
        pe={{ base: '0', lg: '12' }} 
        pt={{ base: '20', lg: '8' }}
        pb={{ base: '8', lg: '24' }} 
      >
        <HeroHeader
          tagline={
            <Box width="fit-content" mx={{ base: 'auto', lg: '0' }}>
              <Link href="#about" onClick={scrollToAbout} onMouseEnter={playHover}>
                <Badge 
                  size="lg" 
                  colorPalette="gray" 
                  variant="subtle" 
                  px="3" 
                  py="1" 
                  borderRadius="full"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: "bg.emphasized", transform: "translateY(-1px)" }}
                >
                  <Icon size="sm" mr="1">
                    <LuUser />
                  </Icon>
                  {tagline}
                </Badge>
              </Link>
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
          description={description}
          alignItems={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "start" }}
        >
          <Stack gap="6" mt="2" alignItems={{ base: "center", lg: "flex-start" }}>
            <Stack direction={{ base: 'column', md: 'row' }} gap="4" w={{ base: "full", md: "auto" }}>
              <Button size="2xl" onClick={scrollToProjects} onMouseEnter={playHover} w={{ base: "full", md: "auto" }}>
                {dict?.exploreWork || "Explore work"} <LuArrowDown /> 
              </Button>
              
              <Dialog.Root placement="center" motionPreset="slide-in-bottom">
                <Dialog.Trigger asChild>
                  <Button 
                    variant="solid" 
                    size="2xl" 
                    colorPalette="gray" 
                    onClick={playClick}
                    onMouseEnter={playHover}
                    w={{ base: "full", md: "auto" }}
                  >
                    {dict?.watchIntro || "Watch Intro"} <LuPlay />
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
            </Stack>

            <HStack 
              gap="3" 
              onClick={scrollToTestimonials}
              onMouseEnter={playHover}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ opacity: 0.8 }}
            >
              {avatars.length > 0 && (
                <HStack gap="-2" me="1">
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
              )}
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
            {videoUrl ? (
              <Video src={videoUrl} poster={imageUrl} autoPlay muted loop controls playsInline objectFit="cover" width="100%" height="100%" />
            ) : (
              <Image src={imageUrl} alt="App Screen" objectFit="cover" width="100%" height="100%" />
            )}
          </PhoneFrame>
        ) : (
          <Box width="full" maxW="lg" px="8">
             <ImagePlaceholder minH={{ base: '96', lg: '3xl' }} height="100%" />
          </Box>
        )}
      </Flex>
    </SimpleGrid>
  )
}