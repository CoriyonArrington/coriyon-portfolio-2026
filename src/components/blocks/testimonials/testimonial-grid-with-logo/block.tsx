"use client"

import { Box, Stack, Heading, Text, Badge, Marquee } from '@chakra-ui/react'
import { TestimonialCard } from './testimonial-card'
import NextImage from 'next/image' // OPTIMIZATION: Imported Next.js Image

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
    <Box overflow="hidden">
      
      <Stack gap="4" align="flex-start" textAlign="left" w="full" mb={{ base: '12', md: '16' }}>
        {(dict?.badge || dict?.tagline || dict?.tag || "Trusted by colleagues") && (
          <Badge 
            size="lg" 
            variant="subtle" 
            rounded="full" 
            px="3" 
            py="1"
          >
            {dict?.badge || dict?.tagline || dict?.tag || "Trusted by colleagues"}
          </Badge>
        )}
        
        {dict?.title && (
          <Heading as="h2" size="4xl" fontWeight="bold">
            {dict.title}
          </Heading>
        )}
        
        {dict?.description && (
          <Text color="fg.muted" fontSize="lg" maxW="2xl">
            {dict.description}
          </Text>
        )}
      </Stack>

      <Marquee.Root pauseOnInteraction py="10">
        <Marquee.Edge side="start" />
        <Marquee.Viewport>
          <Marquee.Content>
            {testimonials.map((testimonial) => (
              <Marquee.Item key={testimonial.id} px="1rem" w={{ base: "320px", md: "400px" }}>
                <TestimonialCard
                  meta={{
                    logo: testimonial.logo_url ? (
                      // OPTIMIZATION: Replaced Chakra Image with NextImage
                      <Box position="relative" h="32px" w="100px" _dark={{ filter: "brightness(0) invert(1)" }}>
                        <NextImage 
                          src={testimonial.logo_url} 
                          alt={`${testimonial.company || 'Company'} logo`} 
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'left' }}
                          sizes="100px"
                        />
                      </Box>
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