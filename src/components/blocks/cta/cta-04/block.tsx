import { Box, Button, Container, Flex, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuChartBar, LuChevronRight, LuFile } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="6xl" py="20">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '8', md: '20' }}
        justify="space-between"
      >
        <Stack flex="1" maxW="2xl">
          <Heading as="h2" size="4xl">
            Start shipping faster
          </Heading>
          <Text color="fg.muted" textStyle="lg" mb="4">
            Streamline your workflow with our intuitive file management system. Upload, organize,
            and collaborate on documents in real-time
          </Text>
          <HStack alignSelf="flex-start">
            <Button size="lg">
              Start Building
              <LuChevronRight />
            </Button>
            <Button size="lg" variant="surface" colorPalette="gray">
              Contact Sales
            </Button>
          </HStack>
        </Stack>

        <Stack gap="4">
          {features.map((feature) => (
            <Flex
              asChild
              key={feature.title}
              gap="4"
              p="4"
              borderWidth="1px"
              rounded="l2"
              focusRing="inside"
            >
              <a href={feature.url}>
                <Icon color="colorPalette.solid" mt="1">
                  {feature.icon}
                </Icon>
                <Box flex="1" me="2">
                  <Text fontWeight="medium">{feature.title}</Text>
                  <Text color="fg.muted">{feature.description}</Text>
                </Box>
                <Icon color="fg.muted" alignSelf="center">
                  <LuChevronRight />
                </Icon>
              </a>
            </Flex>
          ))}
        </Stack>
      </Flex>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    title: 'Documentation',
    description: 'Explore our comprehensive APIs',
    url: '#',
  },
  {
    icon: <LuChartBar />,
    title: 'Getting Started',
    description: 'Learn how to get started with our platform',
    url: '#',
  },
]
