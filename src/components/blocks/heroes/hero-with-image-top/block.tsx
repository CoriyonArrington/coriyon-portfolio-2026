import { Button, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => (
  <>
    <ImagePlaceholder height={{ base: 'sm', md: 'lg' }} />
    <Container py={{ base: '16', md: '24' }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={16} rowGap={4}>
        <Heading as="h1" textStyle={{ base: '4xl', md: '6xl' }} fontWeight="bold">
          Build Powerful Digital Solutions
        </Heading>
        <Stack gap={{ base: '6', md: '8' }} justifyContent="center">
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="fg.muted">
            Transform your ideas into reality with our cutting-edge tools and features. Create
            seamless, professional experiences that drive results.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} gapY="3">
            <Button size={{ base: 'lg', md: 'xl' }}>Get Started</Button>
            <Button variant="outline" size={{ base: 'lg', md: 'xl' }} colorPalette="gray">
              Learn more
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  </>
)
