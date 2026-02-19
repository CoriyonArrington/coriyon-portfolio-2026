import { Avatar, Box, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { Logo } from './logo'

export const Block = () => (
  <Container maxW="4xl" py={{ base: '16', md: '24' }}>
    <Stack gap="8" align="center">
      <Logo />
      <Text textStyle="3xl" textAlign="center">
        "As a senior UI designer at Logoipsum Inc, I have had the pleasure of using Chakra UI for
        several of our projects. I have to say, it has been an absolute game-changer for our team."
      </Text>
      <Flex gap="4" align="center">
        <Avatar.Root size="lg">
          <Avatar.Fallback name="Sarah Johnson" />
          <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        </Avatar.Root>
        <Box>
          <Text fontWeight="semibold">Sarah Johnson</Text>
          <Text color="fg.muted">Senior UI Designer, Logoipsum</Text>
        </Box>
      </Flex>
    </Stack>
  </Container>
)
