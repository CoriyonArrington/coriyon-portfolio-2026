import { Heading, Stack, type StackProps, Text, Box } from '@chakra-ui/react'
import type React from 'react'

/**
 * Props for the SectionHeader component.
 * @extends StackProps from Chakra UI
 */
interface SectionHeaderProps extends StackProps {
  /** The text to display above the main heading */
  tagline?: React.ReactNode
  /** The main heading text */
  headline: React.ReactNode
  /** The descriptive text that appears below the heading */
  description?: React.ReactNode
  /** Optional content to render below the header section */
  children?: React.ReactNode
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { tagline, headline, description, ...rootProps } = props
  return (
    <Stack gap={{ base: '6', md: '8' }} {...rootProps}>
      <Stack gap={{ base: '4', md: '5' }}>
        <Stack gap={{ base: '2', md: '3' }}>
          {tagline && (
            // FIX: Changed <Text> to <Box> to prevent <div> inside <p> hydration crash
            <Box textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.fg">
              {tagline}
            </Box>
          )}
          <Heading as="h2" textStyle={{ base: '3xl', md: '4xl' }}>
            {headline}
          </Heading>
        </Stack>
        {description && (
          <Text color="fg.muted" textStyle={{ base: 'md', md: 'lg' }} maxW="3xl">
            {description}
          </Text>
        )}
      </Stack>
      {props.children}
    </Stack>
  )
}