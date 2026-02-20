import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  RatingGroup,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo } from './logo'

export interface TestimonialData {
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
    <Container maxW="5xl" py={{ base: '16', md: '24' }}>
      <Flex gap={{ base: '12', md: '16' }} direction={{ base: 'column', md: 'row' }} align="center">
        <Image 
          src={testimonial.avatar_url} 
          alt={testimonial.name} 
          boxSize="2xs" 
          rounded="full" 
          objectFit="cover"
        />
        <Stack gap={{ base: '6', md: '8' }} justify="center" flex="1">
          <RatingGroup.Root readOnly value={testimonial.rating} count={5}>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
          <Text textStyle={{ base: 'lg', md: '2xl' }} fontWeight="medium">
            "{testimonial.quote}"
          </Text>
          <HStack gap="8">
            <Stack gap="4" direction={{ base: 'column', md: 'row' }}>
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
                // This inverts the colors of the logo (black becomes white) in dark mode
                _dark={{ filter: "invert(1)" }} 
              />
            ) : (
              <Logo />
            )}
          </HStack>
        </Stack>
      </Flex>
    </Container>
  )
}