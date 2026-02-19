import { Container, Flex, Heading, HStack, Icon, Link, SimpleGrid, Stack } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { CategoryItem } from './category-item'
import { data } from './data'

export const Block = () => (
  <Container maxW="7xl" py={{ base: '8', lg: '16' }}>
    <Stack gap={{ base: '6', md: '8', lg: '12' }}>
      <Flex
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Heading size={{ base: '2xl', md: '3xl' }} mb={{ base: '3', md: '0' }}>
          Shop by Categories
        </Heading>

        <HStack gap={{ base: '2', md: '3' }}>
          <Link fontWeight="semibold">See all categories</Link>
          <Icon color="colorPalette.fg">
            <FaArrowRight />
          </Icon>
        </HStack>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={{ base: '4', md: '6', lg: '8' }}>
        {data.map((item) => (
          <CategoryItem key={item.title} data={item} />
        ))}
      </SimpleGrid>
    </Stack>
  </Container>
)
