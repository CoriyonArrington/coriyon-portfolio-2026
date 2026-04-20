import { Badge, Heading, Stack, Text, type StackProps } from '@chakra-ui/react'

interface SectionHeaderProps extends StackProps {
  dict?: any;
}

export const SectionHeader = ({ dict, ...props }: SectionHeaderProps) => {
  return (
    <Stack gap="4" align="flex-start" {...props}>
      <Badge size="lg" variant="subtle" rounded="full" px="3" py="1">
        {dict?.badge || "FAQs"}
      </Badge>
      <Heading as="h2" size="4xl" fontWeight="bold">
        {dict?.title || "Frequently asked questions"}
      </Heading>
      {dict?.description && (
        <Text color="fg.muted" fontSize="lg" maxW="2xl">
          {dict.description}
        </Text>
      )}
    </Stack>
  )
}