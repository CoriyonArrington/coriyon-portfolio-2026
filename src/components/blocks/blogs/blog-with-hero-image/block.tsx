'use client'

import { Box, Container, Heading, SimpleGrid, Stack, Text, Badge, Button, Highlight } from '@chakra-ui/react'
import { LuYoutube, LuChevronDown } from 'react-icons/lu'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useMemo } from 'react'
import Link from 'next/link'
import { ArticlePreview } from './article-preview'

interface BlogProps {
  dict?: any
  posts?: any[]
  locale?: string
}

export const Block = ({ dict, posts, locale = 'en' }: BlogProps) => {
  const { playHover, playClick } = useUiSounds()

  // Handle Asterisk Highlighting against the solid background
  const rawTitle = dict?.title || (locale === 'es' ? "Lo último del canal" : "Latest from the channel")
  const { displayTitle, highlightQueries } = useMemo(() => {
    const matches = rawTitle.match(/\*(.*?)\*/g)
    const queries = matches ? matches.map((m: string) => m.replace(/\*/g, '')) : []
    const cleanText = rawTitle.replace(/\*/g, '')
    return { displayTitle: cleanText, highlightQueries: queries }
  }, [rawTitle])

  if (!posts || posts.length === 0) return null

  // Grabs the featured video for the top spot, puts the rest in the bottom grid
  const heroPost = posts.find(p => p.isFeatured) || posts[0]
  const gridPosts = posts.filter(p => p.id !== heroPost.id)

  const handleScroll = () => {
    playClick()
    const element = document.getElementById('featured-video')
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <Box w="full" id="blog">
      {/* Increased top padding (pt) to perfectly clear the fixed navbar */}
      <Box bg="colorPalette.solid" pt={{ base: '32', md: '40' }} pb={{ base: '32', md: '48' }}>
        <Container maxW="7xl" px={{ base: '4', md: '8' }}>
          <Stack gap={{ base: '6', md: '8' }} align="flex-start" textAlign="left" maxW="3xl">
            <Badge size="lg" bg="whiteAlpha.300" color="white" border="none" rounded="full" px="3" py="1">
              {dict?.badge || (locale === 'es' ? 'Contenido Destacado' : 'Featured Content')}
            </Badge>
            
            <Heading as="h1" size={{ base: '4xl', md: '6xl' }} fontWeight="bold" color="white" letterSpacing="tight">
              <Highlight query={highlightQueries} styles={{ color: "yellow.400" }}>
                {displayTitle}
              </Highlight>
            </Heading>
            
            <Text color="whiteAlpha.900" fontSize={{ base: 'lg', md: 'xl' }}>
              {dict?.description || "I regularly share insights on product design, engineering, and founder strategy."}
            </Text>

            <Stack direction={{ base: 'column', md: 'row' }} gap="4" mt="2" w={{ base: 'full', md: 'auto' }}>
              {/* Primary High-Contrast Button */}
              <Button 
                size="xl" 
                bg="white" 
                color="colorPalette.solid"
                _hover={{ bg: "gray.100", transform: "translateY(-2px)" }} 
                transition="all 0.2s"
                onClick={handleScroll} 
                onMouseEnter={playHover}
                w={{ base: 'full', md: 'auto' }}
              >
                {locale === 'es' ? 'Ver Videos' : 'Watch Videos'} <LuChevronDown />
              </Button>

              {/* Secondary High-Contrast Solid Button */}
              <Button 
                size="xl" 
                bg="gray.900" 
                color="white"
                _hover={{ bg: "black", transform: "translateY(-2px)" }}
                transition="all 0.2s"
                onClick={playClick} 
                onMouseEnter={playHover}
                w={{ base: 'full', md: 'auto' }}
                asChild
              >
                <Link href="https://www.youtube.com/@uxcoriyon" target="_blank">
                  {locale === 'es' ? 'Suscribirse' : 'Subscribe'} <LuYoutube />
                </Link>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      
      <Container id="featured-video" maxW="7xl" px={{ base: '4', md: '8' }} pb={{ base: '16', md: '24' }} mt={{ base: '-16', md: '-24' }}>
        <Stack gap={{ base: '16', md: '24' }}>
          <ArticlePreview post={heroPost} hero />
          
          {gridPosts.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '8', md: '10' }}>
              {gridPosts.map((post) => (
                <ArticlePreview key={post.id} post={post} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </Box>
  )
}