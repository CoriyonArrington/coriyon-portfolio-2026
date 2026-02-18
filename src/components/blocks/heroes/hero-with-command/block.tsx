import {
  Button,
  Clipboard,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Span,
  Stack,
  Text,
} from '@chakra-ui/react'
import { LuArrowRight, LuCheck, LuCommand, LuCopy } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container maxW="7xl" py={{ base: '16', md: '24' }}>
      <Stack gap="12" align={{ sm: 'center' }} textAlign="center">
        <Stack gap="6" maxW={{ md: '3xl' }}>
          <HStack textStyle="sm" fontWeight="medium" justifyContent="center" gap="2">
            <LuCommand /> We just released Chakra v4.0-rc <LuArrowRight />
          </HStack>

          <Stack gap="4">
            <Heading size={{ base: '4xl', md: '6xl' }}>
              Launch and Deploy your AI app in minutes
            </Heading>
            <Text fontSize="xl" color="fg.muted">
              Deploy your AI app — in seconds, not days.
            </Text>
          </Stack>
        </Stack>

        <Flex direction={{ base: 'column', sm: 'row' }} gap="3" align={{ md: 'center' }}>
          <Clipboard.Root value="npx ai-sdk@latest" asChild>
            <HStack ps="4" pe="2" rounded="l2" layerStyle="fill.surface" colorPalette="gray">
              <HStack fontFamily="mono" height="10" flex="1">
                <Span color="fg.muted" aria-hidden="true">
                  $
                </Span>
                <Span textStyle="sm" fontWeight="semibold" flex="1">
                  npx ai-sdk@latest
                </Span>
              </HStack>
              <Clipboard.Trigger asChild>
                <IconButton variant="ghost" size="sm">
                  <Clipboard.Indicator copied={<LuCheck />}>
                    <LuCopy />
                  </Clipboard.Indicator>
                </IconButton>
              </Clipboard.Trigger>
            </HStack>
          </Clipboard.Root>

          <Button size="lg" px="6">
            Get started <LuArrowRight />
          </Button>
        </Flex>
      </Stack>
    </Container>
  )
}
