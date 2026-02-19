import { HStack, Icon, Span, Square, Stack, Text } from '@chakra-ui/react'
import { LuQuote } from 'react-icons/lu'

export interface TestimonialData {
  quote: string
  author: string
  title: string
  company: string
}

interface TestimonialCardProps {
  data: TestimonialData
}

export const TestimonialCard = (props: TestimonialCardProps) => {
  const { data } = props
  return (
    <Stack
      align={{ base: 'flex-start', md: 'center' }}
      textAlign={{ base: 'start', md: 'center' }}
      gap="6"
    >
      <Square size="10" layerStyle="fill.solid" rounded="l2">
        <Icon size="md">
          <LuQuote />
        </Icon>
      </Square>
      <Text flex="1" textStyle="2xl">
        “{data.quote}”
      </Text>
      <HStack>
        <Text fontWeight="medium">{data.author}</Text>
        <Span>•</Span>
        <Text color="fg.muted">
          {data.title}, {data.company}
        </Text>
      </HStack>
    </Stack>
  )
}
