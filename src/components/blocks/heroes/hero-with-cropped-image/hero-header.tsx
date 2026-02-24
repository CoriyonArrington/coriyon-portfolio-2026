import { Heading, Show, Stack, type StackProps, Text, Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface HeroHeaderProps extends StackProps {
  tagline?: ReactNode
  headline: ReactNode
  description: ReactNode
  children?: ReactNode
}

export const HeroHeader = (props: HeroHeaderProps) => {
  const { tagline, headline, description, ...rootProps } = props
  return (
    <Stack gap={{ base: '6', md: '8' }} {...rootProps}>
      <Stack gap={{ base: '5', md: '6' }}>
        <Stack gap={{ base: '3', md: '4' }}>
          <Show when={tagline}>
            {/* FIX: Changed from <Text> to <Box> to prevent the <div> inside <p> hydration crash! */}
            <Box textStyle={{ base: 'sm', md: 'md' }} fontWeight="medium" color="colorPalette.fg">
              {tagline} 
            </Box>
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