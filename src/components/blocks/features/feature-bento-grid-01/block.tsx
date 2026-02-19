import { Button, Container, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'
import { FeatureCard } from './feature-card'

export const Block = () => {
  return (
    <Container maxW="6xl">
      <Stack gap="8">
        <Flex justify="space-between" gap="10" direction={{ base: 'column', md: 'row' }}>
          <Heading size="4xl" maxW="2xl">
            Streamline Your Workflow with Our Powerful SaaS Solution
          </Heading>
          <Button size="lg">
            Get Started <LuChevronRight />
          </Button>
        </Flex>
        <Grid
          templateColumns={{ lg: 'repeat(3, 1fr)' }}
          templateRows={{ lg: 'repeat(2, 1fr)' }}
          gap="4"
          alignItems="stretch"
        >
          {features.map((feature) => (
            <GridItem colSpan={feature.colSpan} rowSpan={feature.rowSpan} key={feature.title}>
              <FeatureCard
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}

interface Feature {
  title: string
  description: string
  image: React.ReactNode
  colSpan?: number
  rowSpan?: number
}

const features: Feature[] = [
  {
    title: 'AI-Powered',
    description: 'Get actionable insights with advanced machine learning',
    image: <ImagePlaceholder minH="80" />,
    colSpan: 1,
    rowSpan: 2,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Get deep insights into your business metrics',
    image: <ImagePlaceholder minH="40" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team in real-time',
    image: <ImagePlaceholder minH="40" />,
  },
  {
    title: 'Automation Tools',
    description: 'Save time with powerful workflow automation',
    image: <ImagePlaceholder minH="40" />,
  },
  {
    title: 'Cloud Integration',
    description: 'Connect and sync with your favorite cloud services',
    image: <ImagePlaceholder minH="40" />,
  },
]
