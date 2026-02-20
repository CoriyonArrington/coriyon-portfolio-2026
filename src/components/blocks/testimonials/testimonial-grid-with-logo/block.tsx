"use client"

import { Box, Container, Stack, Heading, Text, Badge, Marquee } from '@chakra-ui/react'
import { TestimonialCard } from './testimonial-card'

interface Testimonial {
  id: string | number
  quote: string
  name: string
  role?: string
  company?: string
  logo_url?: string
  avatar_url?: string
}

interface BlockProps {
  dict?: any
  testimonials: Testimonial[]
}

export const Block = ({ dict, testimonials }: BlockProps) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <Box overflow="hidden" py={{ base: '16', md: '24' }}>
      <Container maxW="7xl" mb={{ base: '12', md: '16' }}>
        <Stack gap={{ base: '4', md: '6' }} align="flex-start">
          <Stack gap="3" align="flex-start">
            {/* FIX: Added dict?.badge to the conditional check */}
            {(dict?.badge || dict?.tagline || dict?.tag || "Trusted by customers") && (
              <Badge 
                variant="subtle" 
                colorPalette="green" 
                size="lg" 
                rounded="full" 
                px="3" 
                py="1"
              >
                {dict?.badge || dict?.tagline || dict?.tag || "Trusted by customers"}
              </Badge>
            )}
            
            {dict?.title && (
              <Heading size={{ base: "3xl", md: "4xl" }}>
                {dict.title}
              </Heading>
            )}
          </Stack>
          
          {dict?.description && (
            <Text color="fg.muted" fontSize="lg" maxW="2xl">
              {dict.description}
            </Text>
          )}
        </Stack>
      </Container>

      <Marquee.Root pauseOnInteraction py="10">
        <Marquee.Edge side="start" />
        <Marquee.Viewport>
          <Marquee.Content>
            {testimonials.map((testimonial) => (
              <Marquee.Item key={testimonial.id} px="1rem" w={{ base: "320px", md: "400px" }}>
                <TestimonialCard
                  meta={{
                    logo: testimonial.logo_url ? (
                      <img src={testimonial.logo_url} alt="" style={{ height: '32px' }} />
                    ) : null,
                    authorName: testimonial.name,
                    authorImage: testimonial.avatar_url || '',
                    authorRole: testimonial.company 
                      ? `${testimonial.role || ''} @ ${testimonial.company}` 
                      : testimonial.role || '',
                  }}
                >
                  {testimonial.quote}
                </TestimonialCard>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
        <Marquee.Edge side="end" />
      </Marquee.Root>
    </Box>
  )
}