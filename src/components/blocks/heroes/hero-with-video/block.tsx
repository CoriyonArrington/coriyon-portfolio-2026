'use client'

import { Box, Button, Heading, Stack, Text, VStack, Highlight } from '@chakra-ui/react'
import Spline from '@splinetool/react-spline'
import { useMemo } from 'react'
import { useUiSounds } from '@/hooks/use-ui-sounds'

interface Props {
  dict?: any
}

export const Block = ({ dict }: Props) => {
  const { playHover } = useUiSounds()

  const rawTitle = dict?.title || "Interactive 3D Playground"
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  return (
    // Removed the Theme wrapper so it inherits the global color mode.
    <Box pos="relative" h="100vh" minH="2xl" overflow="hidden" bg="bg.canvas">
      
      <Box 
        pos="absolute" 
        inset="0" 
        zIndex={0} 
        cursor="crosshair" 
        _active={{ cursor: "grabbing" }}
      >
        <Spline scene={dict?.splineUrl || "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"} />
      </Box>
      
      {/* Updated the gradient to use Semantic Tokens so it fades to the current background color */}
      <Box 
        bgGradient="to-t" 
        gradientFrom="bg.canvas" 
        gradientTo="transparent" 
        pos="absolute" 
        inset="0" 
        zIndex={1} 
        pointerEvents="none" 
      />

      <Stack h="full" justify="flex-end" pos="relative" zIndex={2} pointerEvents="none" pb={{ base: '12', md: '20' }}>
        <VStack py="14" px="4" textAlign="center" maxW="3xl" mx="auto" pointerEvents="auto">
          
          {/* Switched to color="fg" to automatically handle light/dark mode */}
          <Heading as="h1" size={{ base: '5xl', md: '7xl' }} fontWeight="bold" letterSpacing="tight" color="fg">
            <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
              {displayTitle}
            </Highlight>
          </Heading>
          
          {/* Switched to color="fg.muted" */}
          <Text my="4" fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted" maxW="xl">
            {dict?.description}
          </Text>
          
          <Stack mt="6" align="center">
            <Button 
              size="xl" 
              colorPalette="gray"
              variant="outline"
              bg="bg.panel"
              backdropFilter="blur(10px)" 
              pointerEvents="none" 
              rounded="full"
              onMouseEnter={playHover}
            >
              {dict?.primaryCta || "Press and drag to orbit"}
            </Button>
          </Stack>

        </VStack>
      </Stack>
    </Box>
  )
}