import { Card, Text } from '@chakra-ui/react'

export const FeatureCard = (props: {
  image: React.ReactNode
  title: string
  description: string
}) => {
  const { image, title, description } = props
  return (
    <Card.Root height="full">
      <Card.Header flex="1">{image}</Card.Header>
      <Card.Body flex="0">
        <Text fontWeight="medium">{title}</Text>
        <Text color="fg.muted">{description}</Text>
      </Card.Body>
    </Card.Root>
  )
}
