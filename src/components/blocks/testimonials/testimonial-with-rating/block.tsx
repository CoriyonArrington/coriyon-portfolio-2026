import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  RatingGroup,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Logo } from './logo'

export const Block = () => (
  <Container maxW="5xl" py={{ base: '16', md: '24' }}>
    <Flex gap={{ base: '12', md: '16' }}>
      <Image src="https://i.pravatar.cc/600?u=1234" alt="Anna Smith" boxSize="2xs" rounded="full" />
      <Stack gap={{ base: '6', md: '8' }} justify="center" flex="1">
        <RatingGroup.Root readOnly value={5}>
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
        <Text textStyle={{ base: 'lg', md: '2xl' }} fontWeight="medium">
          "As a lead developer at ABC Inc, I have had the opportunity to work with Chakra UI on
          multiple projects. I can confidently say that it is one of the best UI libraries I have
          ever used."
        </Text>
        <HStack gap="8">
          <Stack gap="4" direction={{ base: 'column', md: 'row' }}>
            <Box>
              <Text fontWeight="semibold">Anna Smith</Text>
              <Text color="fg.muted">Lead Developer, Lorem Company</Text>
            </Box>
          </Stack>
          <Separator orientation="vertical" />
          <Logo />
        </HStack>
      </Stack>
    </Flex>
  </Container>
)
