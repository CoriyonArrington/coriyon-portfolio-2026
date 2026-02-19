import { Blockquote, Container, HStack, Image, Link, Span, Stack, Text } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { Logo1 } from './logo-ipsum'

export const Block = () => (
  <Container maxW="6xl" py={{ base: '16', md: '24' }}>
    <Blockquote.Root
      variant="plain"
      display="flex"
      gap={{ base: '8', md: '14' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Stack gap="4" align="flex-start" flex="1">
        <Logo1 height="32px" monochrome />
        <Blockquote.Content textStyle="2xl">
          As a Director of Engineering at Logoipsum Inc, I have had the pleasure of using Chakra UI
          for several of our projects. I have to say, it has been an absolute game-changer for our
          team.
        </Blockquote.Content>
        <Link hideBelow="md">
          Read case study <LuArrowRight />
        </Link>
      </Stack>

      <HStack gap="4" whiteSpace="nowrap" pt={{ md: '12' }}>
        <Image src="https://i.pravatar.cc/150?u=12" rounded="l3" boxSize="24" />
        <Stack gap="0">
          <Span color="fg.muted" textStyle="sm">
            Logo Ipsum
          </Span>
          <Text fontWeight="medium" textStyle="lg">
            Sarah Johnson
          </Text>
          <Text
            color="fg.muted"
            textStyle="xs"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="medium"
          >
            Dir of Engineering
          </Text>
        </Stack>
      </HStack>
      <Link hideFrom="md">
        Read case study <LuArrowRight />
      </Link>
    </Blockquote.Root>
  </Container>
)
