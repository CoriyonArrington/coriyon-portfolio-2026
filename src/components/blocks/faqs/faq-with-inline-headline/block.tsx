'use client'
import { Accordion, Button, Container, SimpleGrid, Span, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { LuSend } from 'react-icons/lu'
import { SectionHeader } from './section-header'
import { faqs } from './data'

export const Block = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <Container py={{ base: '16', md: '24' }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '12', lg: '24' }}>
        <SectionHeader
          headline="Got Questions? We've Got Answers!"
          description="We've gathered all the answers you're looking for, neatly organized just for you."
          tagline="Support"
          alignItems="start"
          maxW="lg"
        >
          <Button size="lg">
            Contanct Us <LuSend />
          </Button>
        </SectionHeader>

        <Stack gap="8" flex="1">
          <Accordion.Root multiple defaultValue={[faqs[0].question]}>
            {faqs.slice(0, showAll ? faqs.length : 5).map(({ question, answer }) => (
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
          <Button
            size="xl"
            alignSelf="center"
            variant="outline"
            colorPalette="gray"
            onClick={() => setShowAll(true)}
            display={showAll ? 'none' : 'flex'}
          >
            Show more FAQs
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
