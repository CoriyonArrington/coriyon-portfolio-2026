import { Container, Icon, Link, SimpleGrid, Square, Stack, Text } from '@chakra-ui/react'
import { LuChevronRight, LuCode, LuMessageSquare, LuShieldQuestion } from 'react-icons/lu'
import { SectionHeader } from './section-header'

export const Block = () => {
  return (
    <Container maxW="6xl" py="20">
      <SectionHeader tagline="Get in touch" headline="Contact our team">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
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
        </SimpleGrid>
      </SectionHeader>
    </Container>
  )
}

const features = [
  {
    icon: <LuMessageSquare />,
    title: 'Talk to our team',
    description: 'Speak with our team to learn more about our platform',
    url: '#',
    action: 'Schedule a call',
  },
  {
    icon: <LuShieldQuestion />,
    title: 'Questions? We have answers',
    description: 'Search our help center for answers to common questions',
    url: '#',
    action: 'Browse our docs',
  },
  {
    icon: <LuCode />,
    title: 'Developer API',
    description: 'Access our comprehensive API documentation and resources',
    url: '#',
    action: 'View API docs',
  },
]
