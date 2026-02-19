import { Button, Container, Heading, HStack, Square, Stack, VStack } from '@chakra-ui/react'
import { LuDownload } from 'react-icons/lu'
import { LogoIcon1 } from './logoicon-ipsum'

export const Block = () => {
  return (
    <Container py="16" maxW="4xl">
      <Stack align="center" gap="8">
        <VStack gap="3" textAlign="center">
          <Square size="16" p="4" borderWidth="1px" rounded="lg" color="colorPalette.solid">
            <LogoIcon1 monochrome />
          </Square>
          <Heading as="h2" size="5xl" fontWeight="medium">
            Ready to grow your business? <br />
            Start your free trial today.
          </Heading>
        </VStack>
        <HStack gap="4">
          <Button>Sign up for free</Button>
          <Button variant="outline" colorPalette="gray">
            <LuDownload /> Download app
          </Button>
        </HStack>
      </Stack>
    </Container>
  )
}
