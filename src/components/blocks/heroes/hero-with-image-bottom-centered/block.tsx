'use client'

import { Badge, Box, Button, Center, Heading, Stack, Text, VStack, Dialog, SimpleGrid, Portal, IconButton } from '@chakra-ui/react'
import { LuChevronDown, LuEye, LuX } from 'react-icons/lu'
import Image from 'next/image'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useEffect } from 'react'

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
}

export const Block = ({ 
  dict, title, description, tagline, imageUrl, videoUrl, mockupType, bgColor,
  role, duration, year, teamRoles, deliverables, summary 
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

  const normalizedMockupType = mockupType?.toString().toLowerCase().trim()
  const isTablet = normalizedMockupType === 'tablet' || normalizedMockupType === 'ipad'
  const isPhone = normalizedMockupType === 'phone' || normalizedMockupType === 'mobile' || normalizedMockupType === 'iphone'
  const showMockup = isTablet || isPhone

  const MediaContent = () => (
    <>
      {imageUrl && !videoUrl && (
        <Box position="absolute" inset="0" zIndex="0">
          <Image
            src={imageUrl}
            alt={title || "Project Media"}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </Box>
      )}

      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          controls
          playsInline
          poster={imageUrl || undefined}
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: 1 
          }}
        />
      )}
    </>
  )

  return (
    <VStack gap={{ base: '8', md: '12' }} textAlign="center" w="full">
      <Stack gap="6" align="center" px={{ base: '4', md: '8' }}>
        {tagline && (
          <Badge size="lg" variant="subtle" colorPalette="green" alignSelf="center" rounded="full" px="4" py="1">
            {tagline}
          </Badge>
        )}
        
        <Heading
          as="h1"
          textStyle={{ base: '4xl', md: '6xl', lg: '7xl' }}
          maxW="4xl"
          mx="auto"
          lineHeight="tighter"
          fontWeight="bold"
          letterSpacing="tight"
        >
          {title || 'Project Title'}
        </Heading>
        
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="2xl" mx="auto">
          {description || 'Project description goes here.'}
        </Text>

        <Stack align="center" direction={{ base: 'column', md: 'row' }} gap="4" mt="2">
          {/* Primary Button */}
          <Button 
            size="xl" 
            bg={bgColor || "green.600"} 
            color="white"
            _hover={{ opacity: 0.85 }} 
            onClick={handleScroll} 
            onMouseEnter={playHover}
          >
            {dict?.exploreWork || "Read Case Study"} <LuChevronDown />
          </Button>

          {/* Secondary Button */}
          <Dialog.Root placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <Button 
                size="xl" 
                colorPalette="gray" 
                variant="solid" 
                onClick={playClick} 
                onMouseEnter={playHover}
              >
                {dict?.showOverview || "Show overview"} <LuEye />
              </Button>
            </Dialog.Trigger>
            
            <Portal>
              <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
              <Dialog.Positioner>
                <Dialog.Content p={{ base: "6", md: "8" }} rounded="2xl" shadow="2xl" bg="bg.panel" color="fg.default" maxW="2xl" w="full" mx="4">
                  
                  {/* Flex header ensures vertical centering and perfect right-alignment */}
                  <Dialog.Header pb="6" display="flex" justifyContent="space-between" alignItems="center">
                    <Dialog.Title textStyle="2xl" fontWeight="bold">Project Overview</Dialog.Title>
                    {/* position="static" removes the default absolute positioning! */}
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
                      {summary && (
                        <Box>
                          <Text fontWeight="semibold" color="fg.muted" mb="2" textTransform="uppercase" fontSize="xs" letterSpacing="widest">Summary</Text>
                          <Text fontSize="lg" lineHeight="relaxed">{summary}</Text>
                        </Box>
                      )}
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                        {role && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">My Role</Text>
                            <Text fontWeight="medium">{role}</Text>
                          </Box>
                        )}
                        {duration && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Duration</Text>
                            <Text fontWeight="medium">{duration}</Text>
                          </Box>
                        )}
                        {year && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Year</Text>
                            <Text fontWeight="medium">{year}</Text>
                          </Box>
                        )}
                        {teamRoles && (
                          <Box>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Team Roles</Text>
                            <Text fontWeight="medium">{teamRoles}</Text>
                          </Box>
                        )}
                        {deliverables && (
                          <Box gridColumn={{ md: "span 2" }}>
                            <Text fontWeight="semibold" color="fg.muted" mb="1" fontSize="sm">Deliverables</Text>
                            <Text fontWeight="medium">{deliverables}</Text>
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

      {/* Media Container */}
      {showMockup ? (
        <Center w="full" mt={{ base: '8', md: '12' }} px={{ base: '4', md: '8' }}>
          <Box position="relative" w="full" maxW={isTablet ? "5xl" : "300px"} aspectRatio={isTablet ? '1106/814' : '1/2'}>
            <Box position="absolute" inset={isTablet ? "4.8% 4.2%" : "1.8% 5%"} borderRadius={isTablet ? "md" : "3rem"} overflow="hidden" bg="black" zIndex="0">
              <MediaContent />
            </Box>
            <Box position="relative" h="full" w="full" zIndex="1" pointerEvents="none">
              <Image
                src={isTablet ? "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/ipad-mockup-optimized.png" : "https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/misc/iphone-mockup.png"}
                alt={`${normalizedMockupType} mockup`}
                fill
                priority
                unoptimized={true}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Box>
        </Center>
      ) : (
        <Box maxW="5xl" mx="auto" w="full" mt={{ base: '4', md: '8' }} position="relative" roundedTop="l3" overflow="hidden" aspectRatio={{ base: "4/3", md: "16/9" }} borderWidth="1px" borderBottomWidth="0" borderColor="border.subtle" bg="bg.muted" shadow="md">
          <MediaContent />
        </Box>
      )}
    </VStack>
  )
}