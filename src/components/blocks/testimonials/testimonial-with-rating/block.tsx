import {
  Box,
  Flex,
  HStack,
  Image,
  RatingGroup,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo } from './logo'

interface TestimonialData {
  id: number
  name: string
  role: string
  company: string
  quote: string
  avatar_url: string
  rating: number
  logo_url?: string
}

interface BlockProps {
  testimonial: TestimonialData
}

export const Block = ({ testimonial }: BlockProps) => {
  if (!testimonial) return null

  return (
    // Swapped Container for Box and added mx="auto" to center it without double padding
    <Box maxW="5xl" mx="auto" py={{ base: '16', md: '24' }}>
      <Flex gap={{ base: '8', md: '16' }} direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }}>
        <Image 
          src={testimonial.avatar_url} 
          alt={testimonial.name} 
          boxSize={{ base: '24', md: '2xs' }} 
          rounded="full" 
          objectFit="cover"
        />
        
        <Stack gap={{ base: '6', md: '8' }} justify="center" flex="1" alignItems="flex-start" textAlign="left">
          <RatingGroup.Root readOnly value={testimonial.rating} count={5}>
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
              <Image 
                src={testimonial.logo_url} 
                alt={`${testimonial.company} logo`} 
                maxH="32px" 
                objectFit="contain"
                _dark={{ filter: "invert(1)" }} 
              />
            ) : (
              <Logo />
            )}
          </HStack>
        </Stack>
      </Flex>
    </Box>
  )
}