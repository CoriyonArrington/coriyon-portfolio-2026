import { Badge, Box, Button, Container, Heading, Icon, Stack, Text, VStack } from '@chakra-ui/react'
import { LuChevronRight, LuRocket } from 'react-icons/lu'
import { ImagePlaceholder } from './image-placeholder'

export const Block = () => (
  <Container py={{ base: '16', md: '24' }}>
    <VStack gap="10" textAlign="center">
      <Stack gap="4">
        <Badge size="lg" variant="surface" colorPalette="gray" alignSelf="center">
          <Icon size="sm">
            <LuRocket />
          </Icon>
          We raised $100k in seed funding <LuChevronRight />
        </Badge>
        <Heading
          as="h1"
          textStyle={{ base: '4xl', md: '6xl' }}
          maxW={{ md: '2xl' }}
          mx="auto"
          lineHeight="tighter"
        >
          Build instant experiences in your product
        </Heading>
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW={{ md: '2xl' }} mx="auto">
          Transform your ideas into reality with our cutting-edge tools and features. Create
          seamless, professional experiences that drive results
        </Text>
      </Stack>

      <Stack align="center" direction={{ base: 'column', md: 'row' }} gap="3">
        <Button size="xl">
          Start Building <LuChevronRight />
        </Button>
        <Button variant="ghost" size="xl">
          Learn more <LuChevronRight />
        </Button>
      </Stack>

      <Box maxW="4xl" mx="auto" w="full" mt="10">
        <ImagePlaceholder height="sm" roundedTop="l3" />
      </Box>
    </VStack>
  </Container>
)
