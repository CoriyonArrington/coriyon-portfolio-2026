'use client'

import { Box, Container, HStack, Icon, Stack, Tabs, Text, VStack } from '@chakra-ui/react'
import { LuChartBar, LuFile, LuShare2 } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'
import { SectionHeader } from './section-header'
import { TimerProgress } from './progress'
import { useTimedState } from './use-timed-state'

export const Block = () => {
  const [selected, setSelected] = useTimedState({
    defaultValue: features[0].value,
    timeout: 5000,
    values: features.map((feature) => feature.value),
  })

  return (
    <Container maxW="6xl">
      <VStack gap={{ base: '8', md: '20' }}>
        <Stack gap={{ base: '10', md: '20' }} flex="1">
          <SectionHeader
            textAlign={{ base: 'start', md: 'center' }}
            align="center"
            headline="Create, manage, and share files"
            description="Streamline your workflow with our intuitive file management system. Upload, organize, and collaborate on documents in real-time"
          />
          <Tabs.Root
            hideBelow="md"
            size="lg"
            variant="subtle"
            value={selected}
            onValueChange={(e) => setSelected(e.value)}
          >
            <Tabs.List gap="4">
              {features.map((feature) => (
                <Tabs.Trigger
                  key={feature.title}
                  value={feature.value}
                  flex="1"
                  h="auto"
                  p="5"
                  rounded="l2"
                  textAlign="start"
                >
                  <Stack>
                    <HStack fontWeight="semibold">
                      <Icon size="md">{feature.icon}</Icon>
                      {feature.title}
                    </HStack>
                    <Text color="muted" fontWeight="normal">
                      {feature.description}
                    </Text>
                    <TimerProgress key={selected} selected={selected === feature.value} />
                  </Stack>
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {features.map((feature) => (
              <Tabs.Content key={feature.title} value={feature.value}>
                {feature.image}
              </Tabs.Content>
            ))}
          </Tabs.Root>

          <Stack gap="12" hideFrom="md">
            {features.map((feature) => (
              <Stack key={feature.title} gap="6">
                <Stack>
                  <HStack fontWeight="semibold">
                    <Icon size="md">{feature.icon}</Icon>
                    {feature.title}
                  </HStack>
                  <Text color="muted" fontWeight="normal">
                    {feature.description}
                  </Text>
                </Stack>
                <Box>{feature.image}</Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </VStack>
    </Container>
  )
}

const features = [
  {
    value: 'create-with-ease',
    icon: <LuFile />,
    title: 'Create with ease',
    description: 'Streamline your workflow with our intuitive file management system.',
    url: '#',
    image: <ImagePlaceholder minH={{ base: 'sm', md: 'md' }} rounded="lg" />,
  },
  {
    value: 'track-engagement',
    icon: <LuChartBar />,
    title: 'Track engagement',
    description: 'Monitor file engagement, downloads, and team collaboration.',
    url: '#',
    image: <ImagePlaceholder minH={{ base: 'sm', md: 'md' }} rounded="lg" />,
  },
  {
    value: 'share-and-collaborate',
    icon: <LuShare2 />,
    title: 'Share and collaborate',
    description: 'Generate secure sharing links, set permissions, and work together.',
    url: '#',
    image: <ImagePlaceholder minH={{ base: 'sm', md: 'md' }} rounded="lg" />,
  },
]
