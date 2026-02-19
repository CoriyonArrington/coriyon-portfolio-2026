import { Button, Container, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { LuArrowRight, LuCreditCard, LuSquareCheck } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container py="16" maxW="5xl">
      <Stack gap="8">
        <Stack gap="3">
          <Text textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.fg">
            Join 1000+ companies
          </Text>
          <Heading as="h2" size="5xl">
            Ready to grow your business?
          </Heading>
          <Text color="fg.muted" textStyle={{ base: 'md', md: 'lg' }} maxW="3xl">
            Streamline your workflow and boost team productivity with our all-in-one platform. Get
            more done with less effort through smart automation.
          </Text>
        </Stack>
        <HStack gap="8">
          <HStack>
            <LuSquareCheck />
            Free 14-day trial
          </HStack>
          <HStack>
            <LuCreditCard />
            No credit card required
          </HStack>
        </HStack>
        <HStack gap="4">
          <Button size="lg">
            Start free trial <LuArrowRight />
          </Button>
          <Button size="lg" variant="outline" colorPalette="gray">
            Get a demo
          </Button>
        </HStack>
      </Stack>
    </Container>
  )
}
