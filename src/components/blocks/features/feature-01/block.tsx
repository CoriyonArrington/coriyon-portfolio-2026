import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuArrowRight, LuChartBar, LuFile, LuShare2 } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => {
  return (
    <Container maxW="5xl">
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '20' }}>
        <Stack gap={{ base: '2', md: '3' }} pt="8" maxW="sm" w="full">
          <Text textStyle="xs" textTransform="uppercase" fontWeight="semibold" letterSpacing="wide">
            File Management
          </Text>
          <Heading as="h2" textStyle={{ base: '4xl', md: '5xl' }}>
            Create, manage, and share files
          </Heading>
          <Text color="fg.muted" textStyle="lg" my="2">
            Streamline your workflow with our intuitive file management system. Upload, organize,
            and collaborate on documents in real-time
          </Text>
          <Button alignSelf="flex-start">
            Learn more
            <LuArrowRight />
          </Button>
        </Stack>
        <Box w="full" flex="1">
          <ImagePlaceholder minH={{ base: 'xs', md: 'sm' }} rounded="lg" />
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 2, md: 3 }} gap="10" py="12">
        {features.map((feature) => (
          <Stack key={feature.title} gap="3">
            <Icon color="colorPalette.solid" size="lg">
              {feature.icon}
            </Icon>
            <Text fontWeight="medium">{feature.title}</Text>
            <Text color="fg.muted" mb="3">
              {feature.description}
            </Text>
            <Link textStyle="sm" fontWeight="medium" href={feature.url}>
              Learn more <LuArrowRight />
            </Link>
          </Stack>
        ))}
      </SimpleGrid>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    title: 'Create with ease.',
    description: 'Streamline your workflow with our intuitive file management system.',
    url: '#',
  },
  {
    icon: <LuChartBar />,
    title: 'Track engagement.',
    description: 'Monitor file engagement, downloads, and team collaboration.',
    url: '#',
  },
  {
    icon: <LuShare2 />,
    title: 'Share and collaborate.',
    description: 'Generate secure sharing links, set permissions, and work together.',
    url: '#',
  },
]
