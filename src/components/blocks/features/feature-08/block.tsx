import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuArrowRight, LuChartBar, LuFile, LuLock, LuShare2 } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => {
  return (
    <Container maxW="7xl">
      <Flex direction={{ base: 'column-reverse', md: 'row' }} gap={{ base: '8', md: '20' }}>
        <Stack gap="4" pt={{ md: '8' }} flex="1">
          <HStack gap="2">
            <Badge size="lg">100% Sync</Badge>
            <Badge size="lg">Low Cost</Badge>
          </HStack>
          <Heading as="h2" textStyle={{ base: '4xl', md: '5xl' }}>
            Create, manage, and share files{' '}
            <Span fontWeight="normal" whiteSpace="nowrap">
              (and skip the ads)
            </Span>
          </Heading>
          <Text my="2">
            Streamline your workflow with our intuitive file management system. Upload, organize,
            and collaborate on documents in real-time
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '4', md: '8' }} mb="5">
            {features.map((feature, index) => (
              <Flex key={index} gap="3">
                <Icon color="colorPalette.solid" size="md">
                  {feature.icon}
                </Icon>
                {feature.description}
              </Flex>
            ))}
          </SimpleGrid>

          <HStack>
            <Button>
              Get Started
              <LuArrowRight />
            </Button>
            <Button variant="outline" colorPalette="gray">
              Learn more
              <LuArrowRight />
            </Button>
          </HStack>
        </Stack>

        <Box flex="1">
          <ImagePlaceholder minH={{ base: 'xs', md: 'sm' }} rounded="lg" />
        </Box>
      </Flex>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    description: 'Streamline your workflow with our intuitive file management system.',
  },
  {
    icon: <LuChartBar />,
    description: 'Monitor file engagement, downloads, and team collaboration.',
  },
  {
    icon: <LuShare2 />,
    description: 'Generate secure sharing links, set permissions, and work together.',
  },
  {
    icon: <LuLock />,
    description: 'Advanced encryption and security features to protect your data.',
  },
]
