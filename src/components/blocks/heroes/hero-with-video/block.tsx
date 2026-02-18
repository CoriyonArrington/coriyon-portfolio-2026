import { Box, Button, Heading, HStack, Stack, Text, Theme, VStack } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { VideoPlaceholder } from './video-placeholder'

export const Block = () => {
  return (
    <Theme appearance="dark" pos="relative" h="90dvh" minH="2xl" maxH="2xl">
      <VideoPlaceholder pos="absolute" inset="0" />
      <Box bg="black/30" pos="absolute" inset="0" />
      <Stack h="full" justify="flex-end" pos="relative">
        <VStack py="14" px="4" textAlign="center" maxW="md" mx="auto">
          <Heading as="h1" size={{ base: '5xl', md: '6xl' }}>
            Introducing <br /> Filebase Beta
          </Heading>
          <Text my="2">We&apos;re excited to announce the release of Filebase Beta.</Text>
          <HStack mt="2">
            <Button>
              Try Filebase <LuArrowRight />
            </Button>
            <Button variant="outline" colorPalette="gray" borderColor="fg">
              Contact sales
            </Button>
          </HStack>
        </VStack>
      </Stack>
    </Theme>
  )
}
