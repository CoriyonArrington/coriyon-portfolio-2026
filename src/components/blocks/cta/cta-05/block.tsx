import { Button, Container, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { LuArrowRight, LuCreditCard, LuSquareCheck } from 'react-icons/lu'

export const Block = () => {
  return (
    <Container py="16" maxW="6xl">
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap="8">
        <Stack gap="4" maxW="xl">
          <Heading as="h2" size={{ base: '4xl', md: '5xl' }}>
            Ready to supercharge your business automation
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '4', md: '6' }}>
            <HStack textStyle="sm">
              <LuSquareCheck />
              Free 14-day trial
            </HStack>
            <HStack textStyle="sm">
              <LuCreditCard />
              No credit card required
            </HStack>
            <HStack textStyle="sm">
              <LuSquareCheck />
              Cancel anytime
            </HStack>
          </Stack>
        </Stack>

        <HStack gap="4">
          <Button size="lg">
            Book a demo <LuArrowRight />
          </Button>
          <Button size="lg" variant="outline" colorPalette="gray">
            Start free trial
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}
