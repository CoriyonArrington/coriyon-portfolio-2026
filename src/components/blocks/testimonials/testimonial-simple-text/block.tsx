import { Container } from '@chakra-ui/react'
import { TestimonialCard } from './testimonial-card'

export const Block = () => {
  return (
    <Container maxW="3xl" py="16">
      <TestimonialCard
        data={{
          author: 'John Doe',
          quote:
            'The platform is incredibly versatile - it provides all the building blocks you need to create a solution that perfectly matches your business needs, workflows and data requirements.',
          title: 'CEO',
          company: 'Company Name',
        }}
      />
    </Container>
  )
}
