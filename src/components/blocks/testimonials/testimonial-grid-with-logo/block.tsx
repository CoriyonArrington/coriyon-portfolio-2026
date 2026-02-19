import { Container, SimpleGrid, Stack } from '@chakra-ui/react'
import { SectionHeader } from './section-header'
import { data } from './data'
import { TestimonialCard } from './testimonial-card'

export const Block = () => (
  <Container py={{ base: '16', md: '24' }}>
    <Stack gap="12">
      <SectionHeader tagline="Trusted by customers" headline="What our customers say" />
      <SimpleGrid gap="8" columns={{ base: 1, md: 3 }}>
        {data.map((item) => (
          <TestimonialCard key={item.authorName} meta={item}>
            {item.quote}
          </TestimonialCard>
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
