import { Accordion, Button, Container, Span, Stack } from '@chakra-ui/react'
import { LuSend } from 'react-icons/lu'
import { PageHeader } from './page-header'
import { SectionHeader } from './section-header'
import { faqs } from './data'

export const Block = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '24' }} alignItems="center">
        <PageHeader
          headline="Got Questions? We've Got Answers!"
          description="We've gathered all the answers you're looking for, neatly organized just for you."
          tagline="Support"
          textAlign="center"
        />
        <Accordion.Root multiple defaultValue={[faqs[0].question]} maxW="3xl">
          {faqs.slice(0, 5).map(({ question, answer }) => (
            <Accordion.Item key={question} value={question}>
              <Accordion.ItemTrigger textStyle="lg" py="4">
                <Span flex="1">{question}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent color="fg.muted">
                <Accordion.ItemBody>{answer}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <SectionHeader
          headline="Still have questions?"
          description="Can't find the answer you're looking for? Our team is happy to answer your questions."
          textAlign="center"
          alignItems="center"
        >
          <Button size="lg">
            Get in Touch <LuSend />
          </Button>
        </SectionHeader>
      </Stack>
    </Container>
  )
}
