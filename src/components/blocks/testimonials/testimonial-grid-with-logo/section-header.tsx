import { Badge, Heading, Stack } from '@chakra-ui/react'

export const SectionHeader = ({ dict }: { dict?: any }) => {
  return (
    <Stack gap="4" align="flex-start">
      <Badge size="lg" colorPalette="green" variant="subtle">
        {dict?.badge || "Trusted by customers"}
      </Badge>
      <Heading as="h2" size="4xl" fontWeight="bold">
        {dict?.title || "What our customers say"}
      </Heading>
    </Stack>
  )
}