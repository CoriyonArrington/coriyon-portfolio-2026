import {
  Box,
  Flex,
  HStack,
  RatingGroup,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo } from './logo'
import NextImage from 'next/image' // OPTIMIZATION: Imported Next.js Image

interface TestimonialData {
  id: number | string
  name: string
  role: string
  company: string
  quote: string
  avatar_url?: string
  rating: number
  logo_url?: string
}

interface BlockProps {
  testimonial?: TestimonialData | null
}

export const Block = ({ testimonial }: BlockProps) => {
  if (!testimonial) return null

  return (
    <Box maxW="5xl" mx="auto" py={{ base: '16', md: '24' }}>
      <Flex gap={{ base: '8', md: '16' }} direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }}>
        {testimonial.avatar_url && (
          // OPTIMIZATION: Wrapped in a relative box to use NextImage 'fill'
          <Box position="relative" boxSize={{ base: '24', md: '2xs' }} rounded="full" overflow="hidden" flexShrink={0}>
            <NextImage 
              src={testimonial.avatar_url} 
              alt={testimonial.name} 
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 96px, 256px"
            />
          </Box>
        )}
        
        <Stack gap={{ base: '6', md: '8' }} justify="center" flex="1" alignItems="flex-start" textAlign="left">
          <RatingGroup.Root readOnly value={testimonial.rating || 5} count={5}>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
          
          <Text textStyle={{ base: '2xl', md: '3xl' }} fontWeight="medium">
            "{testimonial.quote}"
          </Text>
          
          <HStack gap="8" justify="flex-start" w="full">
            <Stack gap="4" direction={{ base: 'column', md: 'row' }} align="flex-start">
              <Box>
                <Text fontWeight="semibold">{testimonial.name}</Text>
                <Text color="fg.muted">{testimonial.role}, {testimonial.company}</Text>
              </Box>
            </Stack>
            <Separator orientation="vertical" height="10" />
            {testimonial.logo_url ? (
              // OPTIMIZATION: NextImage for logo with CSS filter applied to parent
              <Box position="relative" h="32px" w="120px" _dark={{ filter: "brightness(0) invert(1)" }}>
                <NextImage 
                  src={testimonial.logo_url} 
                  alt={`${testimonial.company} logo`} 
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  sizes="120px"
                />
              </Box>
            ) : (
              <Logo />
            )}
          </HStack>
        </Stack>
      </Flex>
    </Box>
  )
}