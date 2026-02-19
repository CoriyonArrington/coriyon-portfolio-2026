import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuArrowRight, LuChartLine, LuDollarSign, LuPlaneTakeoff } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="5xl">
      <Stack gap="12">
        <Flex justify="space-between" gap="4" direction={{ base: 'column', md: 'row' }}>
          <Heading textStyle={{ base: '4xl', md: '5xl' }} w="full" maxW={{ md: 'xs' }}>
            Earn money with your time
          </Heading>
          <Stack flex="1" align="flex-start" maxW={{ md: 'md' }} gap="3">
            <Text textStyle="lg">
              Streamline your workflow with our intuitive file management system.
            </Text>
            <Button>
              Get Started <LuArrowRight />
            </Button>
          </Stack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {features.map((feature) => (
            <Card.Root key={feature.title}>
              <Card.Body gap={{ base: '4', md: '10' }}>
                <Icon size="2xl">{feature.icon}</Icon>
                <Stack>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Description>{feature.description}</Card.Description>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

const features = [
  {
    icon: <LuDollarSign />,
    title: 'Earn revenue per file',
    description: 'Your files are your products. Sell them to earn revenue.',
  },
  {
    icon: <LuChartLine />,
    title: 'Grow your business.',
    description: 'Track your growth with analytics and insights to make data-driven decisions.',
  },
  {
    icon: <LuPlaneTakeoff />,
    title: 'Designed to scale.',
    description: 'Our platform is built to handle your growth and scale with you.',
  },
]
