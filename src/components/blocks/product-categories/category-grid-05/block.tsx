import { Container, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { CategoryItem } from './category-item'
import { data } from './data'

export const Block = () => (
  <Container maxW="7xl" py={{ base: '6', md: '8', lg: '12' }}>
    <Stack gap="10">
      <Heading size="4xl" textAlign="center">
        The latest in our collection
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="2">
        {data.items.map((item) => (
          <CategoryItem key={item.title} data={item} />
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
