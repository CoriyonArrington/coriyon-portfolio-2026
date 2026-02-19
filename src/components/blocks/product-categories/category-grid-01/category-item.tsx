import type { BoxProps } from '@chakra-ui/react'
import { AspectRatio, Box, Image, Link, Text } from '@chakra-ui/react'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends BoxProps {
  data: CategoryItemData
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { data, ...rest } = props
  return (
    <Box position="relative" borderRadius="l3" overflow="hidden" {...rest}>
      <Link href={data.url} display="block">
        <AspectRatio ratio={1}>
          <Image src={data.src} alt={data.title} />
        </AspectRatio>
        <Box
          position="absolute"
          inset="0"
          bgGradient="to-b"
          gradientFrom="transparent 60%"
          gradientTo="gray.900"
          boxSize="full"
        />
        <Box position="absolute" bottom="6" width="full" textAlign="center">
          <Text color="white" textStyle="lg" fontWeight="semibold">
            {data.title}
          </Text>
        </Box>
      </Link>
    </Box>
  )
}
