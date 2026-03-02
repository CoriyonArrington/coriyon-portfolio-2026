'use client'

import { AspectRatio, Avatar, Box, Heading, HStack, Stack, Text, IconButton } from '@chakra-ui/react'
import { LuPlay } from 'react-icons/lu'
import { useState } from 'react'
import NextImage from 'next/image'

interface Props {
  post: any
  hero?: boolean
}

export const ArticlePreview = (props: Props) => {
  const { post, hero } = props
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Use hqdefault as a fallback if maxresdefault isn't available for older videos
  const thumbnailUrl = `https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`
  
  return (
    <Stack gap={{ base: '5', md: '6' }} align="flex-start" w="full">
      <AspectRatio 
        ratio={16 / 9} 
        w="full" 
        maxH={hero ? "3xl" : "md"} 
        borderRadius="l3" 
        overflow="hidden" 
        shadow="md" 
        bg="black"
        position="relative"
      >
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0&autoplay=1`}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', inset: 0 }}
          />
        ) : (
          <Box 
            position="relative" 
            w="full" 
            h="full" 
            cursor="pointer" 
            onClick={() => setIsPlaying(true)}
            role="button"
            aria-label={`Play video: ${post.title}`}
          >
            <NextImage 
              src={thumbnailUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes={hero ? "(max-width: 1024px) 100vw, 80vw" : "(max-width: 768px) 100vw, 33vw"}
              priority={hero}
            />
            {/* Play Button Overlay */}
            <Box 
              position="absolute" 
              inset="0" 
              bg="blackAlpha.400" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              transition="all 0.2s"
              _hover={{ bg: "blackAlpha.200" }}
            >
              <IconButton 
                aria-label="Play video" 
                size="2xl" 
                rounded="full" 
                colorPalette="green" 
                variant="solid"
                pointerEvents="none"
              >
                <LuPlay fill="currentColor" size="24" />
              </IconButton>
            </Box>
          </Box>
        )}
      </AspectRatio>
      
      <Stack gap="3" flex="1" w="full">
        <Stack gap="1">
          <Text textStyle="sm" fontWeight="bold" color="colorPalette.solid">
            {post.category}
          </Text>
          <Heading size={hero ? '3xl' : 'xl'} fontWeight="bold" letterSpacing="tight">
            {post.title}
          </Heading>
        </Stack>
        <Text color="fg.muted" textStyle={hero ? 'lg' : 'md'} maxW="4xl">
          {post.excerpt}
        </Text>
      </Stack>
      
      {post.author && (
        <HStack gap="3" mt="2">
          <Avatar.Root size="sm">
            <Avatar.Fallback />
            <Avatar.Image src={post.author.avatarUrl} />
          </Avatar.Root>
          <Box textStyle="sm">
            <Text fontWeight="semibold" color="fg">{post.author.name}</Text>
            <Text color="fg.muted">{post.publishedAt}</Text>
          </Box>
        </HStack>
      )}
    </Stack>
  )
}