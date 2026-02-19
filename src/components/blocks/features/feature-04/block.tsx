import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Square,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuChartBar, LuFile, LuShare2, LuUsers } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="6xl">
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: '8', lg: '12' }}>
        <Stack align="flex-start">
          <Badge size="lg" variant="surface">
            Fast and secure
          </Badge>
          <Heading textStyle={{ base: '4xl', md: '5xl' }} w="full" maxW={{ md: 'xs' }}>
            Earn money with your time
          </Heading>
          <Text textStyle="lg">
            Streamline your workflow with our intuitive file management system.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" pt={{ sm: '4' }}>
          {features.map((feature) => (
            <Box key={feature.title}>
              <Flex gap="4">
                <Square size="8" layerStyle="fill.subtle" rounded="l2">
                  <Icon size="sm">{feature.icon}</Icon>
                </Square>
                <Stack>
                  <Text fontWeight="medium">{feature.title}</Text>
                  <Text color="fg.muted">{feature.description}</Text>
                </Stack>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    title: 'Create with ease',
    description: 'Streamline your workflow with our intuitive file management system.',
  },
  {
    icon: <LuChartBar />,
    title: 'Track engagement',
    description: 'Monitor file engagement, downloads, and team collaboration.',
  },
  {
    icon: <LuShare2 />,
    title: 'Share and collaborate',
    description: 'Generate secure sharing links, set permissions, and work together.',
  },
  {
    icon: <LuUsers />,
    title: 'Team management',
    description: 'Organize teams, assign roles, and control access levels efficiently.',
  },
]
