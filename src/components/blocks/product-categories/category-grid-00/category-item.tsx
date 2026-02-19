import type { BoxProps } from '@chakra-ui/react'
import { Box, Center, Image, Text } from '@chakra-ui/react'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends BoxProps {
  data: CategoryItemData
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { data, ...rest } = props
  return (
    <Box position="relative" borderRadius="l3" overflow="hidden" {...rest}>
      <Image src={data.src} alt={data.title} minH="40" h="full" />
      <Box position="absolute" inset="0" bg="black/16" />
      <Center position="absolute" inset="0">
        <Text color="white" textStyle="xl" fontWeight="extrabold" textTransform="uppercase">
          {data.title}
        </Text>
      </Center>
    </Box>
  )
}
