import { Card, Text } from '@chakra-ui/react'

export const FeatureCard = (props: {
  image: React.ReactNode
  title: string
  description: string
}) => {
  const { image, title, description } = props
  return (
    <Card.Root variant="subtle" height="full">
      <Card.Body flex="0">
        <Text fontWeight="medium">{title}</Text>
        <Text color="fg.muted">{description}</Text>
      </Card.Body>
      <Card.Footer flex="1" pt="0">
        {image}
      </Card.Footer>
    </Card.Root>
  )
}
