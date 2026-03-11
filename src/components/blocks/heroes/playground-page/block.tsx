'use client'

import { Badge, Box, Button, Center, Heading, Stack, Text, VStack, Highlight } from '@chakra-ui/react'
import { LuChevronDown, LuBot } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo } from 'react'

interface PlaygroundHeroProps {
  dict?: any;
  title?: string;
  description?: string;
  tagline?: string;
  exploreText?: string;
  secondaryText?: string;
  interactiveElement?: React.ReactNode;
}

export const Block = ({ 
  dict, title, description, tagline, exploreText, secondaryText, interactiveElement
}: PlaygroundHeroProps) => {
  const { playClick, playHover } = useUiSounds()

  const handleScroll = () => {
    playClick()
    const element = document.getElementById('playground-projects')
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const handleOpenChat = () => {
    playClick()
    window.dispatchEvent(new Event('open-ai-chat'))
  }

  const rawTitle = title || dict?.title || 'Creative Playground'
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  const finalTagline = tagline || dict?.tagline;
  const finalDescription = description || dict?.description;
  const finalExploreText = exploreText || dict?.exploreText || "Explore projects";
  const finalSecondaryText = secondaryText || dict?.secondaryText || "Chat with AI";

  return (
    <VStack gap={{ base: '8', md: '12' }} textAlign="center" w="full" minW="0" pt={{ base: '32', md: '40' }} pb={{ base: '16', md: '24' }}>
      {/* FIX: Removed px to eliminate double-padding */}
      <Stack gap="6" align="center" w="full" minW="0" maxW="4xl" mx="auto">
        {finalTagline && (
          <Badge size="lg" variant="subtle" colorPalette="gray" alignSelf="center" rounded="full" px="4" py="1">
            {finalTagline}
          </Badge>
        )}
        
        <Heading
          as="h1"
          textStyle={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }} // FIX: Scaled down base size
          w="full"
          minW="0"
          wordBreak="break-word" // FIX: Prevent word bleeding
          lineHeight={{ base: '1.2', md: '1.1' }}
          fontWeight="bold"
          letterSpacing="tight"
        >
          <Highlight query={highlightQueries} styles={{ color: "green.600" }}>
            {displayTitle}
          </Highlight>
        </Heading>
        
        {finalDescription && (
          <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} w="full" minW="0" maxW="2xl" mx="auto">
            {finalDescription}
          </Text>
        )}

        {/* FIX: align="stretch" to force buttons to full width on mobile */}
        <Stack align={{ base: 'stretch', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap="4" mt="4" w={{ base: 'full', md: 'auto' }}>
          <Button 
            size="xl" 
            h={{ base: 14, md: 16 }}
            px={{ base: 6, md: 8 }}
            fontSize="lg"
            colorPalette="green" 
            variant="solid"
            onClick={handleScroll} 
            onMouseEnter={playHover}
            w={{ base: 'full', md: 'auto' }}
          >
            {finalExploreText} <LuChevronDown style={{ marginLeft: '8px' }} />
          </Button>

          <Button 
            size="xl" 
            h={{ base: 14, md: 16 }}
            px={{ base: 6, md: 8 }}
            fontSize="lg"
            colorPalette="gray"
            variant="solid" 
            onClick={handleOpenChat} 
            onMouseEnter={playHover}
            w={{ base: 'full', md: 'auto' }}
          >
            {finalSecondaryText} <LuBot style={{ marginLeft: '8px' }} />
          </Button>
        </Stack>
      </Stack>

      {/* FIX: Removed px from here as well */}
      <Box w="full" minW="0" mt={{ base: 4, md: 8 }}>
        <Box 
          maxW="5xl" 
          mx="auto" 
          w="full" 
          position="relative" 
          borderRadius="l3" 
          overflow="hidden" 
          borderWidth="1px" 
          borderColor="border.subtle" 
          bg="bg.muted" 
          shadow="md"
          aspectRatio={{ base: "4/3", md: "16/9" }}
        >
          <Center position="absolute" inset="0" zIndex="0" pointerEvents="auto">
            {interactiveElement}
          </Center>
        </Box>
      </Box>
    </VStack>
  )
}