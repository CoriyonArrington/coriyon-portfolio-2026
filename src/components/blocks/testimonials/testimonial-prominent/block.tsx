import { Blockquote, Box, Container, Link, Stack, Text } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { Logo1 } from './logo-ipsum'

export const Block = () => (
  <Container py={{ base: '16', md: '24' }}>
    <Blockquote.Root
      variant="plain"
      display="flex"
      gap="14"
      flexDirection={{ base: 'column-reverse', md: 'row' }}
    >
      <Stack gap="4" align="flex-start">
        <Box _icon={{ height: '8' }}>
          <Logo1 monochrome />
        </Box>
        <Stack gap="0.5">
          <Text fontWeight="semibold" textStyle="lg">
            Sarah Johnson
          </Text>
          <Text color="fg.muted">Senior UI Designer, Logoipsum</Text>
        </Stack>
      </Stack>

      <Stack gap="4" flex="1" pos="relative" ps={{ md: '16' }}>
        <Blockquote.Icon boxSize="10" pos="absolute" top="0" left="0" hideBelow="md" />
        <Blockquote.Content textStyle={{ base: '3xl', md: '4xl' }} fontWeight="medium">
          As a senior UI designer at Logoipsum Inc, I have had the pleasure of using Chakra UI for
          several of our projects. I have to say, it has been an absolute game-changer for our team.
        </Blockquote.Content>
        <Link>
          Read more <LuArrowRight />
        </Link>
      </Stack>
    </Blockquote.Root>
  </Container>
)
