import { Box, type BoxProps, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import { FaChevronRight } from 'react-icons/fa'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends BoxProps {
  data: CategoryItemData
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { data, ...rest } = props
  return (
    <Box
      position="relative"
      borderRadius="l3"
      overflow="hidden"
      minH={{ base: 'sm', lg: 'auto' }}
      {...rest}
    >
      <Image src={data.src} boxSize="full" objectFit="cover" alt={data.title} />
      <Box
        position="absolute"
        inset="0"
        bgImage="linear-gradient(180deg, var(--gradient-from) 48%, var(--gradient-to) 100%)"
        gradientFrom="transparent"
        gradientTo="blackAlpha.800"
        boxSize="full"
      />
      <Flex color="white" direction="column-reverse" position="absolute" inset="0">
        <Stack gap="5" p="6">
          <Stack gap="1">
            <Heading as="h3" size="xl" fontWeight="bold">
              {data.title}
            </Heading>
            <Text>{data.description}</Text>
          </Stack>
          <Link href={data.url} color="white">
            Shop now
            <FaChevronRight />
          </Link>
        </Stack>
      </Flex>
    </Box>
  )
}
