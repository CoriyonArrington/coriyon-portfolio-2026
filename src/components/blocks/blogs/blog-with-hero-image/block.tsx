'use client'

import { Box, Container, Heading, SimpleGrid, Stack, Text, Badge } from '@chakra-ui/react'
import { ArticlePreview } from './article-preview'

interface BlogProps {
  dict?: any
  posts?: any[]
}

export const Block = ({ dict, posts }: BlogProps) => {
  if (!posts || posts.length === 0) return null

  // Grabs the featured video for the top spot, puts the rest in the bottom grid
  const heroPost = posts.find(p => p.isFeatured) || posts[0]
  const gridPosts = posts.filter(p => p.id !== heroPost.id)

  return (
    <Box w="full">
      <Box bg="colorPalette.solid" pt={{ base: '16', md: '24' }} pb={{ base: '32', md: '48' }}>
        <Container maxW="7xl" px={{ base: '4', md: '8' }}>
          <Stack gap={{ base: '6', md: '8' }} align="flex-start" textAlign="left">
            <Badge size="lg" bg="whiteAlpha.300" color="white" border="none" rounded="full" px="3" py="1">
              {dict?.badge || "Content & Insights"}
            </Badge>
            <Heading as="h2" size="4xl" fontWeight="bold" color="white">
              {dict?.title || "Latest from the channel"}
            </Heading>
            <Text color="whiteAlpha.900" fontSize="lg" maxW="2xl">
              {dict?.description || "I regularly share insights on product design, engineering, and founder strategy. Watch my latest breakdown or read the newest articles below."}
            </Text>
          </Stack>
        </Container>
      </Box>
      
      <Container maxW="7xl" px={{ base: '4', md: '8' }} pb={{ base: '16', md: '24' }} mt={{ base: '-16', md: '-24' }}>
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