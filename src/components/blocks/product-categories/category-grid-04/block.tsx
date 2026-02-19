import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { CategoryItem } from './category-item'
import { data } from './data'

export const Block = () => (
  <Container maxW="7xl" py={{ base: '6', md: '8', lg: '12' }}>
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="2">
      <Box position="relative" className="light">
        <Image src={data.src} alt={data.title} h="full" />
        <Box position="absolute" insetX="0" bottom="0" padding={{ base: '4', md: '8' }}>
          <Stack>
            <Heading color="fg" size="2xl">
              {data.title}
            </Heading>
            <Text color="fg.muted">{data.description}</Text>
          </Stack>
          <HStack mt="4">
            {data.links.map((link) => (
              <Button colorPalette="gray" key={link.title} asChild>
                <a href={link.url}>{link.title}</a>
              </Button>
            ))}
          </HStack>
        </Box>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="2">
        {data.items.map((item) => (
          <CategoryItem key={item.title} data={item} />
        ))}
      </SimpleGrid>
    </SimpleGrid>
  </Container>
)
