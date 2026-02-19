import { Container } from '@chakra-ui/react'
import { LogoIcon2 } from './logoicon-ipsum'
import { TestimonialCard } from './testimonial-card'

export const Block = () => {
  return (
    <Container maxW="2xl" py="16">
      <TestimonialCard
        data={{
          logo: <LogoIcon2 monochrome />,
          author: 'John Doe',
          quote:
            'The platform is incredibly versatile - it provides all the building blocks you need to create a solution that perfectly matches your business needs, workflows and data requirements.',
          title: 'CEO',
          company: 'Company Name',
          avatar: 'https://i.pravatar.cc/150?u=445',
        }}
      />
    </Container>
  )
}
