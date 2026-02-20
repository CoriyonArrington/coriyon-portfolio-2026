import { Badge, Heading, Stack, type StackProps, Text } from '@chakra-ui/react'
import type React from 'react'

interface SectionHeaderProps extends StackProps {
  tagline?: React.ReactNode
  headline: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { tagline, headline, description, ...rootProps } = props
  return (
    <Stack gap="4" align="flex-start" {...rootProps}>
      {tagline && (
        <Badge size="lg" colorPalette="green" variant="subtle" rounded="full" px="3" py="1">
          {tagline}
        </Badge>
      )}
      <Heading as="h2" size="4xl" fontWeight="bold">
        {headline}
      </Heading>
      {description && (
        <Text color="fg.muted" fontSize="lg" maxW="2xl">
          {description}
        </Text>
      )}
      {props.children}
    </Stack>
  )
}