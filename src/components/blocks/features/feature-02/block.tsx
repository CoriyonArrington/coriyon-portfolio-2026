import {
  Button,
  Circle,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuChartBar, LuFile, LuShare2 } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="5xl">
      <Stack align={{ md: 'center' }} gap={{ base: '8', md: '20' }}>
        <Stack align={{ base: 'flex-start', md: 'center' }} gap="2" maxW="3xl" w="full">
          <Heading as="h2" textStyle={{ base: '3xl', md: '4xl' }} textAlign={{ md: 'center' }}>
            Create, manage, and share files with ease.
          </Heading>
          <Text color="fg.muted" textStyle="lg" my="2" textAlign={{ md: 'center' }}>
            Streamline your workflow with our intuitive file management system. Upload, organize,
            and collaborate on documents in real-time.
          </Text>
          <HStack>
            <Button size="lg">Get Started</Button>
            <Button variant="outline" colorPalette="gray" size="lg">
              Contact sales
            </Button>
          </HStack>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="10" pt={{ base: '8', md: '0' }}>
          {features.map((feature) => (
            <Stack key={feature.title} gap="3">
              <Circle size="12" layerStyle="fill.solid">
                <Icon size="md">{feature.icon}</Icon>
              </Circle>
              <Text fontWeight="medium">{feature.title}</Text>
              <Text color="fg.muted" mb="3">
                {feature.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    title: 'Create with ease.',
    description: 'Streamline your workflow with our intuitive file management system.',
  },
  {
    icon: <LuChartBar />,
    title: 'Track engagement.',
    description: 'Monitor file engagement, downloads, and team collaboration.',
  },
  {
    icon: <LuShare2 />,
    title: 'Share and collaborate.',
    description: 'Generate secure sharing links, set permissions, and work together.',
  },
]
