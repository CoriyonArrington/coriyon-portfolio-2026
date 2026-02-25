'use client'

import { Badge, Box, Button, Flex, Icon, SimpleGrid, Stack, Highlight } from '@chakra-ui/react'
import { LuRocket, LuArrowDown } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import Script from 'next/script'
import { useMemo } from 'react'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface Props {
  dict?: any
}

export const Block = ({ dict }: Props) => {
  const { playHover, playClick } = useUiSounds()

  const rawTitle = dict?.title || "Creative *Playground*"
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const splineUrl = dict?.splineUrl || "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"

  const scrollToProjects = () => {
    playClick()
    const element = document.getElementById('playground-projects')
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <Box position="relative" minH="100vh" bg="bg.canvas" className="pattern-dots" overflow="hidden">
      
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.0.94/build/spline-viewer.js" 
        strategy="lazyOnload" 
      />

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 0 }} minH="100vh">
        
        {/* Left Column: Text */}
        <Flex
          align="center"
          justify={{ base: "center", lg: "flex-end" }} 
          ps={{ base: '6', md: '8', lg: '0' }} 
          pe={{ base: '6', md: '8', lg: '12' }}
          pt={{ base: '32', lg: '0' }}
          pb={{ base: '16', lg: '0' }} 
          h="full"
        >
          <HeroHeader
            tagline={
              <Box width="fit-content" mx={{ base: 'auto', lg: '0' }}>
                <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px={3}>
                  <Icon size="sm" mr="1">
                    <LuRocket />
                  </Icon>
                  {dict?.badge || "Experimental"}
                </Badge>
              </Box>
            }
            headline={
              <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
                {displayTitle}
              </Highlight>
            }
            description={dict?.description || "A collection of experimental projects, interactive 3D scenes, and technical explorations."}
            alignItems={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "start" }}
            maxW={{ base: "full", md: "xl", lg: "lg", xl: "xl" }}
            zIndex={2}
          >
            <Stack direction={{ base: 'column', md: 'row' }} gap="4" mt="2" w={{ base: "full", md: "auto" }}>
              <Button 
                size="xl" 
                h={{ base: 14, md: 16 }}
                px={{ base: 6, md: 8 }}
                fontSize="lg"
                colorPalette="green" 
                onClick={scrollToProjects} 
                onMouseEnter={playHover}
                w={{ base: "full", md: "auto" }}
              >
                {dict?.primaryCta || "See experiments"} <LuArrowDown />
              </Button>
            </Stack>
          </HeroHeader>
        </Flex>

        {/* Right Column: 3D Scene */}
        <Box
          pos={{ lg: 'absolute' }}
          right="0"
          top={{ lg: '0' }}
          bottom={{ lg: '0' }}
          w={{ base: 'full', lg: '50%' }}
          height={{ base: '500px', lg: '100%' }} 
          css={{
            clipPath: { lg: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          }}
          zIndex={1}
        >
           {/* Shift the entire scene left by 15% to fix the offset */}
           <Box 
             pos="absolute" 
             inset="0" 
             pointerEvents={{ base: 'none', lg: 'auto' }}
             transform="translateX(-15%)"
           >
              {/* @ts-ignore */}
              <spline-viewer 
                url={splineUrl} 
                loading-reveal="true"
              />
              
              <Badge 
                pos="absolute" 
                bottom={{ base: 6, lg: 10 }} 
                left={{ base: "50%", lg: "54%" }} 
                transform="translateX(-50%)"
                colorPalette="gray"
                variant="solid"
                rounded="full"
                px={4}
                py={1.5}
                pointerEvents="none"
                zIndex={2}
                shadow="md"
                display={{ base: 'none', lg: 'block' }} // Hide hint on mobile
              >
                {dict?.dragText || "Press and drag to orbit"}
              </Badge>
           </Box>
        </Box>

      </SimpleGrid>

      <style dangerouslySetInnerHTML={{ __html: `
        spline-viewer {
          width: 100%;
          height: 100%;
          display: block;
        }
        /* Completely disable interactions on mobile to allow normal page scrolling */
        @media (max-width: 991px) {
          spline-viewer {
            pointer-events: none !important;
          }
        }
      `}} />
    </Box>
  )
}