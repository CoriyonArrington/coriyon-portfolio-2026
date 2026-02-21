import { AspectRatio, Avatar, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'

interface Props {
  post: any
  hero?: boolean
}

export const ArticlePreview = (props: Props) => {
  const { post, hero } = props
  
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
      >
        <iframe
          src={`https://www.youtube.com/embed/${post.youtubeId}?rel=0`}
          title={post.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
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