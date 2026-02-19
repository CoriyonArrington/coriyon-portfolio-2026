import { Container, SimpleGrid, Stack } from '@chakra-ui/react'
import { SectionHeader } from './section-header'
import { TestimonialCard } from './testimonial-card'

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  avatar_url: string
  logo_url?: string
}

interface BlockProps {
  testimonials: Testimonial[]
}

export const Block = ({ testimonials }: BlockProps) => {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap="12">
        <SectionHeader tagline="Trusted by customers" headline="What our customers say" />
        <SimpleGrid gap="8" columns={{ base: 1, md: 3 }}>
          {testimonials.map((item) => (
            <TestimonialCard 
              key={item.id} 
              meta={{
                authorName: item.name,
                authorRole: item.role && item.company ? `${item.role}, ${item.company}` : (item.role || item.company),
                authorImage: item.avatar_url,
                logo: item.logo_url ? <img src={item.logo_url} alt={item.company} style={{ height: '20px' }} /> : undefined
              }}
            >
              {item.quote}
            </TestimonialCard>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}