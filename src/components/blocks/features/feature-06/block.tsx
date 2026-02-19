'use client'

import { Accordion, Box, Container, Flex, HStack, Icon, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { LuChartBar, LuFile, LuShare2 } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'
import { SectionHeader } from './section-header'

export const Block = () => {
  const [selected, setSelected] = useState<string[]>(['create-with-ease'])
  const selectedFeature = features.find((feature) => feature.value === selected[0])

  return (
    <Container maxW="6xl">
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '20' }}>
        <Stack gap="6" pt="2" flex="1">
          <SectionHeader
            headline="Create, manage, and share files"
            description="Streamline your workflow with our intuitive file management system. Upload, organize, and collaborate on documents in real-time"
          />
          <Accordion.Root
            variant="plain"
            size="lg"
            value={selected}
            onValueChange={(e) => setSelected(e.value)}
          >
            {features.map((feature) => (
              <Accordion.Item key={feature.title} value={feature.value}>
                <Accordion.ItemTrigger
                  fontWeight="semibold"
                  alignItems="center"
                  _expanded={{ color: 'colorPalette.fg' }}
                >
                  <HStack flex="1">
                    <Icon size="md">{feature.icon}</Icon>
                    {feature.title}
                  </HStack>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Stack gap="5">
                      {feature.description}
                      <Box flex="1" w="full" hideFrom="md">
                        {selectedFeature?.image}
                      </Box>
                    </Stack>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Stack>

        <Box flex="1" w="full" hideBelow="md">
          {selectedFeature?.image}
        </Box>
      </Flex>
    </Container>
  )
}

const features = [
  {
    value: 'create-with-ease',
    icon: <LuFile />,
    title: 'Create with eases',
    description: 'Streamline your workflow with our intuitive file management system.',
    url: '#',
    image: <ImagePlaceholder minH="sm" rounded="lg" />,
  },
  {
    value: 'track-engagement',
    icon: <LuChartBar />,
    title: 'Track engagement',
    description: 'Monitor file engagement, downloads, and team collaboration.',
    url: '#',
    image: <ImagePlaceholder minH="sm" rounded="lg" />,
  },
  {
    value: 'share-and-collaborate',
    icon: <LuShare2 />,
    title: 'Share and collaborate',
    description: 'Generate secure sharing links, set permissions, and work together.',
    url: '#',
    image: <ImagePlaceholder minH="sm" rounded="lg" />,
  },
]
