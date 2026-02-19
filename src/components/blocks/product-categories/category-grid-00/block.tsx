import { Container, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { CategoryItem } from './category-item'
import { data } from './data'

export const Block = () => (
  <Container maxW="7xl" py={{ base: '8', lg: '16' }}>
    <Stack gap={{ base: '6', md: '8', lg: '12' }}>
      <Heading size="3xl">Trending This Week</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="4">
        {data.map((item) => (
          <CategoryItem key={item.title} data={item} />
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
