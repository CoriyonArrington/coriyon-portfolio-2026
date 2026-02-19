import {
  Box,
  Container,
  Flex,
  Float,
  HStack,
  Image,
  Span,
  Square,
  Stack,
  Stat,
  Text,
} from '@chakra-ui/react'
import { LogoIcon2 } from './logoicon-ipsum'

export const Block = () => {
  return (
    <Container maxW="2xl" py="20">
      <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: '12', md: '16' }}>
        <Box pos="relative" alignSelf="flex-start">
          <Image
            src="https://i.pravatar.cc/600?u=1234"
            alt="Anna Smith"
            boxSize="32"
            rounded="lg"
          />
          <Float placement="bottom-end" offset="2">
            <Square layerStyle="fill.solid" size="10" p="1" rounded="l2">
              <LogoIcon2 monochrome />
            </Square>
          </Float>
        </Box>
        <Stack gap="4" justify="center" flex="1">
          <Text textStyle="xl" fontWeight="medium">
            "As a lead developer at ABC Inc, I have had the opportunity to work with Chakra UI on
            multiple projects. I can confidently say that it is one of the best UI libraries I have
            ever used."
          </Text>
          <HStack gap="8">
            <Stack gap="4" direction={{ base: 'column', md: 'row' }}>
              <Text spaceX="0.5">
                <Span color="fg.muted">—</Span>
                <Span fontWeight="semibold">Anna Smith</Span>
                <Span color="fg.muted">, Lead Developer @ Lorem Company</Span>
              </Text>
            </Stack>
          </HStack>
          <Flex mt="8">
            <Stat.Root flex="1" size="lg">
              <Stat.ValueText fontWeight="normal">37%</Stat.ValueText>
              <Stat.Label>increase in revenue</Stat.Label>
            </Stat.Root>
            <Stat.Root flex="1" size="lg">
              <Stat.ValueText fontWeight="normal">140%</Stat.ValueText>
              <Stat.Label>boost in conversion</Stat.Label>
            </Stat.Root>
          </Flex>
        </Stack>
      </Flex>
    </Container>
  )
}
