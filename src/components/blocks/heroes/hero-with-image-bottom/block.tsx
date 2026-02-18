import { Badge, Button, Container, Icon, Stack } from '@chakra-ui/react'
import { LuRocket } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => (
  <Container py={{ base: '16', md: '24' }}>
    <Stack gap={{ base: '12', md: '16' }}>
      <HeroHeader
        tagline={
          <Badge size="lg" colorPalette="gray">
            <Icon size="sm">
              <LuRocket />
            </Icon>
            Now Available
          </Badge>
        }
        headline="Build Powerful Digital Solutions"
        description="Transform your ideas into reality with our cutting-edge tools and features. Create seamless, professional experiences that drive results."
      >
        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
          <Button size={{ base: 'lg', md: '2xl' }}>Get Started</Button>
          <Button variant="outline" size={{ base: 'lg', md: '2xl' }} colorPalette="gray">
            Learn more
          </Button>
        </Stack>
      </HeroHeader>
      <ImagePlaceholder height={{ base: 'sm', md: 'lg' }} />
    </Stack>
  </Container>
)
