import {
  Badge,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuCloudLightning, LuCommand, LuHistory, LuStar, LuZap } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'
import { FeatureCard } from './feature-card'

export const Block = () => {
  return (
    <Container maxW="6xl">
      <Stack gap={{ base: '10', md: '14' }}>
        <Stack gap="4" align="flex-start">
          <Badge variant="subtle" size="lg">
            <LuStar /> Best in Class
          </Badge>
          <Heading size={{ base: '4xl', md: '5xl' }}>
            Streamline with our Powerful SaaS Solution
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            Our SaaS solution is designed to streamline your workflow and improve your business
            metrics
          </Text>
        </Stack>

        <Grid
          templateColumns={{ md: 'repeat(6, 1fr)' }}
          templateRows={{ md: 'repeat(2, 1fr)' }}
          gap="4"
          alignItems="stretch"
        >
          {features.map((feature) => (
            <GridItem colSpan={{ md: feature.colSpan }} key={feature.title}>
              <FeatureCard
                image={feature.image}
                title={feature.title}
                description={feature.description}
              />
            </GridItem>
          ))}
        </Grid>

        <SimpleGrid columns={{ base: 1, md: 4 }} gap="8">
          {subFeatures.map((subFeature) => (
            <Stack key={subFeature.title}>
              <HStack>
                <Icon color="colorPalette.solid">{subFeature.icon}</Icon>
                <Span fontWeight="medium">{subFeature.title}</Span>
              </HStack>
              <Text color="fg.muted">{subFeature.description}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

interface Feature {
  title: string
  description: string
  image: React.ReactNode
  colSpan?: number
}

const features: Feature[] = [
  {
    title: 'AI-Powered',
    description: 'Get actionable insights.',
    image: <ImagePlaceholder minH="40" rounded="lg" />,
    colSpan: 4,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Get deep insights into your data',
    image: <ImagePlaceholder minH="40" rounded="lg" />,
    colSpan: 2,
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team',
    image: <ImagePlaceholder minH="40" rounded="lg" />,
    colSpan: 3,
  },
  {
    title: 'Automation Tools',
    description: 'Save time with powerful automation',
    image: <ImagePlaceholder minH="40" rounded="lg" />,
    colSpan: 3,
  },
]

interface SubFeature {
  title: string
  description: string
  icon: React.ReactNode
}

const subFeatures: SubFeature[] = [
  {
    title: 'Version History',
    description: 'Track changes and restore previous versions',
    icon: <LuHistory />,
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and reliability with advanced monitoring',
    icon: <LuZap />,
  },
  {
    title: 'Command Menu',
    description: 'Quick access to all features through an intuitive interface',
    icon: <LuCommand />,
  },
  {
    title: 'Lightning Fast',
    description: 'Built for speed with optimized code and prefetching',
    icon: <LuCloudLightning />,
  },
]
