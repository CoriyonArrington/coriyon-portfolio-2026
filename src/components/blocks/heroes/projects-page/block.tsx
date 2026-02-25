'use client'

import { Badge, Box, Button, Center, Heading, Stack, Text, VStack, Dialog, SimpleGrid, Portal, IconButton, Highlight } from '@chakra-ui/react'
import { LuChevronDown, LuEye, LuX } from 'react-icons/lu'
import Image from 'next/image'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect, useMemo } from 'react'

interface HeroProps {
  dict?: any;
  title?: string;
  description?: string;
  tagline?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  mockupType?: string | null;
  bgColor?: string | null; 
  
  // Case Study Overview Data
  role?: string | null;
  duration?: string | null;
  year?: string | number | null;
  teamRoles?: string | null;
  deliverables?: string | null;
  summary?: string | null;
  industries?: string | null;
  platforms?: string | null;
}

export const Block = ({ 
  dict, title, description, tagline, imageUrl, videoUrl, mockupType, bgColor,
  role, duration, year, teamRoles, deliverables, summary, industries, platforms
}: HeroProps) => {
  const { playClick, playHover } = useUiSounds()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const handleScroll = () => {
    playClick()
    const element = document.getElementById('projects')
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

  // Fallback to reading from the dictionary if props aren't explicitly passed
  const finalTagline = tagline || dict?.tagline;
  const finalDescription = description || dict?.description || 'Project description goes here.';
  const finalImageUrl = imageUrl || dict?.imageUrl;
  const finalVideoUrl = videoUrl || dict?.videoUrl;
  const finalMockupType = mockupType || dict?.mockupType;
  
  // Safely extract nested stats from the JSON dictionary
  const displayRole = role || dict?.stats?.role;
  const displayDuration = duration || dict?.stats?.duration;
  const displayYear = year || dict?.stats?.year;
  const displayTeamRoles = teamRoles || dict?.stats?.teamRoles;
  const displayDeliverables = deliverables || dict?.stats?.deliverables;
  const displaySummary = summary || dict?.stats?.summary;
  const displayIndustries = industries || dict?.stats?.industries;
  const displayPlatforms = platforms || dict?.stats?.platforms;

  const normalizedMockupType = finalMockupType?.toString().toLowerCase().trim()
  const isTablet = normalizedMockupType === 'tablet' || normalizedMockupType === 'ipad'
  const isPhone = normalizedMockupType === 'phone' || normalizedMockupType === 'mobile' || normalizedMockupType === 'iphone'
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
      <Stack gap="6" align="center" px={{ base: '4', md: '8' }}>
        {finalTagline && (
          <Badge size="lg" variant="subtle" colorPalette="green" alignSelf="center" rounded="full" px="4" py="1">
            {finalTagline}
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
        
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl" mx="auto">
          {finalDescription}
        </Text>

        <Stack align="center" direction={{ base: 'column', md: 'row' }} gap="4" mt="2" w={{ base: 'full', md: 'auto' }}>
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
            {dict?.exploreWork || "Read case study"} <LuChevronDown />
          </Button>

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
                {dict?.showOverview || "Show overview"} <LuEye />
              </Button>
            </Dialog.Trigger>
            
            <Portal>
              <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
              <Dialog.Positioner>
                <Dialog.Content p={{ base: "6", md: "8" }} rounded="2xl" shadow="2xl" bg="bg.panel" color="fg.default" maxW="2xl" w="full" mx="4">
                  
                  <Dialog.Header pb="6" display="flex" justifyContent="space-between" alignItems="center">
                    <Dialog.Title textStyle="2xl" fontWeight="bold">Project overview</Dialog.Title>
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
                      {displaySummary && (
                        <Box>
                          <Text fontWeight="semibold" color="fg.muted" mb="2" textTransform="uppercase" fontSize="xs" letterSpacing="widest">Summary</Text>
                          <Text fontSize="lg" lineHeight="relaxed">{displaySummary}</Text>
                        </Box>
                      )}
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                        {displayRole && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">My role</Text>
                            <Text fontWeight="medium">{displayRole}</Text>
                          </Box>
                        )}
                        {displayDuration && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Duration</Text>
                            <Text fontWeight="medium">{displayDuration}</Text>
                          </Box>
                        )}
                        {displayYear && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Year</Text>
                            <Text fontWeight="medium">{displayYear}</Text>
                          </Box>
                        )}
                        {displayIndustries && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Industries</Text>
                            <Text fontWeight="medium">{displayIndustries}</Text>
                          </Box>
                        )}
                        {displayPlatforms && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Platforms</Text>
                            <Text fontWeight="medium">{displayPlatforms}</Text>
                          </Box>
                        )}
                        {displayTeamRoles && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Team roles</Text>
                            <Text fontWeight="medium">{displayTeamRoles}</Text>
                          </Box>
                        )}
                        {displayDeliverables && (
                          <Box gridColumn={{ md: "span 2" }}>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Deliverables</Text>
                            <Text fontWeight="medium">{displayDeliverables}</Text>
                          </Box>
                        )}
                      </SimpleGrid>
                    </Stack>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

        </Stack>
      </Stack>

      {/* Conditionally render standalone phone or the presentation box */}
      {isPhone ? (
        <Center w="full" mt={{ base: '8', md: '12' }} px={{ base: '4', md: '8' }}>
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
          maxW="5xl" 
          mx="auto" 
          w="full" 
          mt={{ base: '8', md: '12' }} 
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
    </VStack>
  )
}