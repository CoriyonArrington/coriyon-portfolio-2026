import { Badge, Box, Button, Container, Icon, Stack } from '@chakra-ui/react'
import { LuRocket } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => (
  <Box position="relative" height={{ lg: '720px' }}>
    <Container py={{ base: '16', md: '24' }} height="full">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '16' }}
        align={{ lg: 'center' }}
        height="full"
      >
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
          justifyContent="center"
          maxW={{ md: 'xl', lg: 'md', xl: 'xl' }}
        >
          <Stack direction={{ base: 'column', md: 'row' }} gap="3">
            <Button size={{ base: 'lg', md: '2xl' }}>Get Started</Button>
            <Button variant="outline" size={{ base: 'lg', md: '2xl' }} colorPalette="gray">
              Learn more
            </Button>
          </Stack>
        </HeroHeader>

        <Box
          pos={{ lg: 'absolute' }}
          right="0"
          bottom="0"
          w={{ base: 'full', lg: '50%' }}
          height={{ base: '96', lg: 'full' }}
          css={{
            clipPath: { lg: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)' },
          }}
        >
          <ImagePlaceholder />
        </Box>
      </Stack>
    </Container>
  </Box>
)
