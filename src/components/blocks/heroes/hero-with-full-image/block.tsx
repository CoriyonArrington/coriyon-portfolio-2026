import { Badge, Button, Flex, Icon, SimpleGrid, Stack } from '@chakra-ui/react'
import { LuRocket } from 'react-icons/lu'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => (
  <SimpleGrid columns={{ base: 1, lg: 2 }}>
    <Flex
      align="center"
      justify="center"
      ps={{ base: '4', md: '6', lg: '8' }}
      pe={{ base: '4', md: '16' }}
      py={{ base: '16', md: '24' }}
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
      >
        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
          <Button size={{ base: 'lg', md: '2xl' }}>Get Started</Button>
          <Button variant="outline" size={{ base: 'lg', md: '2xl' }} colorPalette="gray">
            Learn more
          </Button>
        </Stack>
      </HeroHeader>
    </Flex>
    <ImagePlaceholder minH={{ base: '96', lg: '3xl' }} />
  </SimpleGrid>
)
