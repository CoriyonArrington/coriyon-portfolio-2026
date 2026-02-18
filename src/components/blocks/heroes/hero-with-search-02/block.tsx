import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

export const Block = () => {
  return (
    <Box as="header" py="32">
      <Container maxW="2xl">
        <VStack gap="8">
          <Heading as="h1" size={{ base: '4xl', md: '5xl' }}>
            Hi. How can we help?
          </Heading>

          <HStack gap="4" alignSelf="stretch">
            <InputGroup
              flex="1"
              alignSelf="stretch"
              startElement={
                <Icon size="lg">
                  <LuSearch />
                </Icon>
              }
            >
              <Input bg="bg" ps="12" placeholder="Search Help Center..." size="xl" />
            </InputGroup>
            <Button size="xl">Search</Button>
          </HStack>

          <HStack gap="4">
            <Text color="fg.muted" fontWeight="medium">
              Popular topics
            </Text>
            <HStack wrap="wrap">
              {popularTopics.map((topic) => (
                <Link
                  variant="underline"
                  href={topic.href}
                  key={topic.label}
                  textStyle="sm"
                  borderWidth="1px"
                  px="2"
                  py="1"
                  rounded="l2"
                >
                  {topic.label}
                </Link>
              ))}
            </HStack>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}

const popularTopics = [
  { label: 'Account', href: '#' },
  { label: 'Billing', href: '#' },
  { label: 'Privacy', href: '#' },
]
