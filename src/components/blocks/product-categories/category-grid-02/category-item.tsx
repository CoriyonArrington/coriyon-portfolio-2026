import { Box, type BoxProps, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends BoxProps {
  data: CategoryItemData
  objectFit?: BoxProps['objectFit']
}

export const CategoryItem = (props: CategoryItemProps) => {
  // Fixed: objectPosition defaults to 'center', not 'cover' (which is invalid for position)
  const { data, objectPosition = 'center', ...rest } = props
  
  return (
    <Box borderRadius="l3" overflow="hidden" position="relative" width="full" {...rest}>
      <Image
        boxSize="full"
        maxHeight={{ base: '240px', md: '100%' }}
        src={data.src}
        alt={data.title}
        objectFit="cover"
        objectPosition={objectPosition}
      />
      <Box
        position="absolute"
        inset="0"
        // Dark gradient overlay to ensure text is readable
        background="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)"
        px={{ base: '6', md: '10' }}
        py={{ base: '6', md: '10' }}
        boxSize="full"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <Stack gap="3">
          <Heading size="2xl" color="white">
            {data.title}
          </Heading>
          {data.description && (
            <Text color="whiteAlpha.900" maxW="xs" mb="2" fontWeight="medium">
              {data.description}
            </Text>
          )}
          {/* UPDATED: 
            1. Changed text to "View Project"
            2. Styled as a solid white button for contrast 
          */}
          <Button 
            variant="solid" 
            bg="white" 
            color="black" 
            _hover={{ bg: "gray.200" }} 
            alignSelf="start" 
            asChild
          >
            <a href={data.url}>View Project</a>
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}