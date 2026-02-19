import { Container, Flex, Heading, Link, SimpleGrid, Stack } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { CategoryItem } from './category-item'
import { data } from './data'

export const Block = () => (
  <Container maxW="7xl" py={{ base: '6', md: '8', lg: '12' }}>
    <Stack gap={{ base: '6', md: '8' }}>
      <Flex
        justify="space-between"
        align={{ base: 'start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '4', md: '0' }}
      >
        <Heading size={{ base: '2xl', md: '3xl' }}>Season's Favorites</Heading>
        <Link fontWeight="semibold" color="colorPalette.fg">
          See all categories
          <FaArrowRight />
        </Link>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
        {data.map((item) => (
          <CategoryItem key={item.title} data={item} />
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
