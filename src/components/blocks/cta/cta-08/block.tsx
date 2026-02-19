import { Container, Icon, Link, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { LuChevronRight, LuCode, LuMessageSquare, LuShieldQuestion } from 'react-icons/lu'
import { SectionHeader } from './section-header'

export const Block = () => {
  return (
    <Container maxW="6xl" py="20">
      <SectionHeader tagline="Friendly and helpful support" headline="Contact our support team">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
          {features.map((feature) => (
            <VStack key={feature.title} gap="6" p="6" shadow="sm" rounded="l3" textAlign="center">
              <Icon size="2xl" color="colorPalette.solid">
                {feature.icon}
              </Icon>

              <Stack flex="1">
                <Text textStyle="lg" fontWeight="medium">
                  {feature.title}
                </Text>
                <Text color="fg.muted">{feature.description}</Text>
              </Stack>

              <Link href={feature.url} fontWeight="medium" justifyContent="center">
                {feature.action}
                <Icon color="fg.muted" alignSelf="center">
                  <LuChevronRight />
                </Icon>
              </Link>
            </VStack>
          ))}
        </SimpleGrid>
      </SectionHeader>
    </Container>
  )
}

const features = [
  {
    icon: <LuMessageSquare />,
    title: 'Talk to Sales',
    description: 'Speak with our team to learn more about our platform',
    url: '#',
    action: 'Schedule a call',
  },
  {
    icon: <LuShieldQuestion />,
    title: 'Questions',
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
