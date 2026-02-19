import { Box, Container, Grid, Stack } from '@chakra-ui/react'
import { SectionHeader } from './section-header'
import { testimonials } from './data'
import { TestimonialCard } from './testimonial-card'

export const Block = () => {
  return (
    <Container maxW="7xl" py="16">
      <Stack gap="12">
        <SectionHeader
          headline="Trusted by startups and companies"
          description="Join the growing number of customers who love LogoIpsum"
          tagline="What people are saying"
        />
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              data-first={index === 0 || undefined}
              data-last={index === testimonials.length - 1 || undefined}
              css={{
                '&[data-first]': {
                  gridRow: 'span 2 / span 2',
                },
                '&[data-last]': {
                  gridRow: 'span 2 / span 2',
                  gridColumnStart: { md: 2, xl: 3 },
                  gridRowStart: { md: 4, xl: 2 },
                },
              }}
            >
              <TestimonialCard data={testimonial} />
            </Box>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}
