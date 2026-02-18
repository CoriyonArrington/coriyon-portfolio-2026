import { Box, Container, Heading, Icon, Input, InputGroup, Stack, Text } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

export const Block = () => {
  return (
    <Box as="header" py="16">
      <Container maxW="6xl">
        <Stack gap="8">
          <Stack>
            <Heading as="h1" size={{ base: '4xl', md: '5xl' }}>
              Help Center
            </Heading>
            <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }}>
              Find answers to your questions and get help with our platform.
            </Text>
          </Stack>
          <InputGroup
            alignSelf="stretch"
            startElement={
              <Icon size="lg">
                <LuSearch />
              </Icon>
            }
          >
            <Input
              bg="bg"
              ps="12"
              rounded="lg"
              placeholder="Search for articles..."
              size="2xl"
              focusRingColor="transparent"
              _focusVisible={{ shadow: 'lg' }}
            />
          </InputGroup>
        </Stack>
      </Container>
    </Box>
  )
}
