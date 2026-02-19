import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react'
import type { TestimonialData } from './data'

interface TestimonialCardProps {
  data: TestimonialData
}

export const TestimonialCard = (props: TestimonialCardProps) => {
  const { data } = props
  return (
    <Stack bg="bg.panel" p="6" rounded="l2" shadow="xs" h="full">
      {data.logo && (
        <Box mb={6} maxW="120px">
          {data.logo}
        </Box>
      )}
      <Text mb={4} flex="1">
        {data.quote}
      </Text>
      <HStack gap="3">
        <Avatar.Root shape="rounded" size="md">
          <Avatar.Fallback />
          <Avatar.Image src={data.avatar} />
        </Avatar.Root>
        <Box>
          <Text fontWeight="medium">{data.author}</Text>
          <Text color="fg.muted" fontSize="sm">
            {data.title} / {data.company}
          </Text>
        </Box>
      </HStack>
    </Stack>
  )
}
