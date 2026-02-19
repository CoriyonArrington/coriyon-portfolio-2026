import { Box, Container, Flex, HStack, Icon, Stack } from '@chakra-ui/react'
import { LuChartBar, LuFile, LuShare2 } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'
import { SectionHeader } from './section-header'

export const Block = () => {
  return (
    <Container maxW="6xl">
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '20' }}>
        <Stack gap="6" pt="2" flex="1">
          <SectionHeader
            tagline="File Management"
            headline="Create, manage, and share files"
            description="Streamline your workflow with our intuitive file management system. Upload, organize, and collaborate on documents in real-time"
          />
          <Stack gap={{ base: '4', md: '6' }}>
            {features.map((feature) => (
              <HStack key={feature.title}>
                <Icon>{feature.icon}</Icon>
                {feature.title}
              </HStack>
            ))}
          </Stack>
        </Stack>

        <Box flex="1" w="full">
          <ImagePlaceholder minH={{ base: 'xs', md: 'sm' }} rounded="lg" />
        </Box>
      </Flex>
    </Container>
  )
}

const features = [
  {
    icon: <LuFile />,
    title: 'Create with ease.',
  },
  {
    icon: <LuChartBar />,
    title: 'Track engagement.',
  },
  {
    icon: <LuShare2 />,
    title: 'Share and collaborate.',
  },
]
