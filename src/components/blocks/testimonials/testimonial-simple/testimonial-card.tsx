import { Avatar, Box, Circle, Float, Stack, Text } from '@chakra-ui/react'

export interface TestimonialData {
  logo: React.ReactNode
  quote: string
  author: string
  title: string
  company: string
  avatar: string
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
      <Avatar.Root colorPalette="gray" size="2xl">
        <Avatar.Fallback />
        <Avatar.Image src={data.avatar} />

        <Float placement="bottom-end" offset="2">
          <Circle
            bg="bg"
            outline="3px solid"
            outlineColor="bg.panel"
            size="4"
            _icon={{ boxSize: '100%' }}
          >
            {data.logo}
          </Circle>
        </Float>
      </Avatar.Root>
      <Text mb="2" flex="1" textStyle="xl">
        “{data.quote}”
      </Text>
      <Box>
        <Text fontWeight="medium">{data.author}</Text>
        <Text color="fg.muted" fontSize="sm">
          {data.title}, {data.company}
        </Text>
      </Box>
    </Stack>
  )
}
