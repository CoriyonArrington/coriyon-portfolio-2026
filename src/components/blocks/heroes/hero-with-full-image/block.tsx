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
  Highlight 
} from '@chakra-ui/react'
import { LuDownload, LuArrowDown, LuMapPin } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'
import { DownloadTrigger } from '@/components/ui/download-trigger'
import Link from 'next/link'

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
}

export const Block = ({ 
  dict,
  title = "Design Better Products",
  description = "I help early-stage founders and small business owners design better products, services, and customer experiences.",
  tagline = "Senior Product Designer in Minneapolis", 
  videoUrl, 
  imageUrl 
}: BlockProps) => {
  
  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      const offset = 120 
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 12, lg: 0 }}>
      <Flex
        align="center"
        justify="center"
        pe={{ base: '0', lg: '12' }} 
        pt={{ base: '8', md: '8' }}
        pb={{ base: '16', md: '24' }}
      >
        <HeroHeader
          tagline={
            <Box width="fit-content">
              <Link href="/about">
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
                    <LuMapPin />
                  </Icon>
                  {tagline}
                </Badge>
              </Link>
            </Box>
          }
          headline={
            <Highlight 
              query={["Better Products", "Experiences", "Digital Solutions", " drive results", "Mejores Productos", "experiencias", "resultados"]} 
              styles={{ color: "green.600" }}
            >
              {title}
            </Highlight>
          }
          description={description}
          alignItems={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "start" }}
        >
          <Stack direction={{ base: 'column', md: 'row' }} gap="4" mt="2">
            <Button size="2xl" onClick={scrollToProjects}>
              {dict?.exploreWork || "Explore work"} <LuArrowDown /> 
            </Button>
            
            <DownloadTrigger 
              value="/Resume-Coriyon Arrington-Senior Product Designer.pdf"
              fileName="Coriyon_Arrington_Resume.pdf"
            >
              <Button variant="outline" size="2xl" colorPalette="gray" borderColor="border.strong">
                {dict?.downloadResume || "Download Resume"} <LuDownload />
              </Button>
            </DownloadTrigger>
          </Stack>
        </HeroHeader>
      </Flex>
      
      <Flex 
        align="center" 
        justify="center" 
        minH={{ base: 'auto', lg: '3xl' }} 
        py={{ base: 12, lg: 0 }}
      >
        {videoUrl || imageUrl ? (
          <PhoneFrame>
            {videoUrl ? (
              <Video
                src={videoUrl}
                poster={imageUrl}
                autoPlay
                muted
                loop
                controls
                playsInline
                objectFit="cover"
                width="100%"
                height="100%"
              />
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