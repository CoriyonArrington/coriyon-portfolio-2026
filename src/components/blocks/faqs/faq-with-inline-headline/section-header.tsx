import { Badge, Heading, Stack, Text } from '@chakra-ui/react'

export const SectionHeader = ({ dict }: { dict?: any }) => {
  return (
    <Stack gap="4" align="flex-start">
      {/* Updated to match the fully rounded pill style of the other sections */}
      <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
        {dict?.badge || "FAQs"}
      </Badge>
      <Heading as="h2" size="4xl" fontWeight="bold">
        {dict?.title || "Frequently asked questions"}
      </Heading>
      {dict?.description && (
        <Text color="fg.muted" fontSize="lg">
          {dict.description}
        </Text>
      )}
    </Stack>
  )
}