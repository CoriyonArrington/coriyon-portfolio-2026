import { Heading, Show, Stack, type StackProps, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

/**
 * Props for the HeroHeader component.
 * @extends StackProps from Chakra UI
 */
export interface HeroHeaderProps extends StackProps {
  /** The text to display above the main heading */
  tagline?: ReactNode
  /** The main heading text */
  headline: ReactNode
  /** The descriptive text that appears below the heading */
  description: ReactNode
  /** Optional content to render below the header section */
  children?: ReactNode
}

export const HeroHeader = (props: HeroHeaderProps) => {
  const { tagline, headline, description, ...rootProps } = props
  return (
    <Stack gap={{ base: '6', md: '8' }} {...rootProps}>
      <Stack gap={{ base: '5', md: '6' }}>
        <Stack gap={{ base: '3', md: '4' }}>
          <Show when={tagline}>
            <Text textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.fg">
              {headline}
            </Text>
          </Show>
          <Heading as="h1" textStyle={{ base: '4xl', md: '6xl' }} fontWeight="bold">
            {headline}
          </Heading>
        </Stack>
        <Text color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }} maxW="3xl">
          {description}
        </Text>
      </Stack>
      {props.children}
    </Stack>
  )
}
