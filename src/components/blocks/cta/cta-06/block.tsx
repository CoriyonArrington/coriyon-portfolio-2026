import { Button, Container, Flex, Heading, Icon, Link, Square, Stack, Text } from '@chakra-ui/react'
import { LuChevronRight, LuRocket, LuUser } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="6xl" py="20">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '8', md: '20' }}
        justify="space-between"
      >
        <Stack flex="1" maxW="2xl" align="flex-start">
          <Heading as="h2" size="4xl">
            Start shipping faster
          </Heading>
          <Text color="fg.muted" textStyle="lg" mb="4">
            Streamline your workflow with our intuitive file management system. Upload, organize,
            and collaborate on documents.
          </Text>
          <Button size="lg">Start Building</Button>
        </Stack>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          flex="1"
          gap={{ base: '8', md: '4' }}
          align="flex-start"
        >
          {features.map((feature) => (
            <Stack direction={{ base: 'row', md: 'column' }} key={feature.title} gap="4">
              <Square size="10" borderWidth="1px" rounded="l2">
                <Icon color="colorPalette.solid">{feature.icon}</Icon>
              </Square>
              <Stack flex="1">
                <Text fontWeight="medium">{feature.title}</Text>
                <Text color="fg.muted" textStyle="sm">
                  {feature.description}
                </Text>
                <Link href={feature.url} fontWeight="medium" textStyle="sm">
                  {feature.action}
                  <Icon color="fg.muted" alignSelf="center">
                    <LuChevronRight />
                  </Icon>
                </Link>
              </Stack>
            </Stack>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

const features = [
  {
    icon: <LuRocket />,
    title: 'Start building',
    description: 'Sign up for a free account and start building for free',
    url: '#',
    action: 'Sign up now',
  },
  {
    icon: <LuUser />,
    title: 'Book a Demo',
    description: 'Speak with our team to learn more about our platform',
    url: '#',
    action: 'Book a Demo',
  },
]
