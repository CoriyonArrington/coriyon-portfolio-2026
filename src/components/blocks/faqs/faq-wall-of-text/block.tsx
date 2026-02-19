import { Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { PageHeader } from './page-header'
import { faqs } from './data'

export const Block = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '24' }}>
        <PageHeader
          headline="Got Questions? We've Got Answers!"
          description="We've gathered all the answers you're looking for, neatly organized just for you."
          tagline="Support"
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '12', lg: '16' }}>
          {faqs.map(({ question, answer }) => (
            <Stack key={question}>
              <Heading as="h3" textStyle="lg">
                {question}
              </Heading>
              <Text color="fg.muted">{answer}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
