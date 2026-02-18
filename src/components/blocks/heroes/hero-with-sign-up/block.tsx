import {
  AspectRatio,
  Button,
  Container,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { HeroHeader } from './hero-header'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={16}>
        <HeroHeader
          headline="Build Powerful Digital Solutions"
          description="Transform your ideas into reality with our cutting-edge tools and features. Create seamless, professional experiences that drive results."
          justifyContent="center"
        >
          <Stack gap="1.5">
            <Stack direction={{ base: 'column', md: 'row' }} gap="3">
              <Input
                placeholder="Enter your email"
                size={{ base: 'lg', md: '2xl' }}
                maxW={{ lg: 'xs' }}
              />
              <Button size={{ base: 'lg', md: '2xl' }}>Sign Up</Button>
            </Stack>
            <Text textStyle="xs" color="fg.muted">
              By signing up, you accept our <Link href="#">Terms and Conditions.</Link>
            </Text>
          </Stack>
        </HeroHeader>
        <AspectRatio ratio={1}>
          <ImagePlaceholder />
        </AspectRatio>
      </SimpleGrid>
    </Container>
  )
}
