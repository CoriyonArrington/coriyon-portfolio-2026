import { Avatar, Blockquote, Box, Text } from '@chakra-ui/react'

interface TestimonialCardProps {
  children: React.ReactNode
  meta: {
    logo: React.ReactNode
    authorName: string
    authorImage: string
    authorRole: string
  }
}

export const TestimonialCard = (props: TestimonialCardProps) => {
  const { children, meta } = props
  return (
    <Blockquote.Root
      display="flex"
      flexDirection="column"
      variant="plain"
      bg="bg.muted"
      rounded="l2"
      p="8"
    >
      <Box _icon={{ h: '8' }}> {meta.logo}</Box>
      <Blockquote.Content mt="4" flex="1">
        <Blockquote.Icon display="inline-flex" ms="-1" me="2" />
        {children}
      </Blockquote.Content>
      <Blockquote.Caption display="flex" gap="3" mt="12">
        <Avatar.Root shape="rounded" size="xl">
          <Avatar.Fallback />
          <Avatar.Image src={meta.authorImage} />
        </Avatar.Root>
        <Box>
          <Text fontWeight="semibold" textStyle="lg" color="fg">
            {meta.authorName}
          </Text>
          <Text color="fg.muted">{meta.authorRole}</Text>
        </Box>
      </Blockquote.Caption>
    </Blockquote.Root>
  )
}