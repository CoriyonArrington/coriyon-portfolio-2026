import {
  Box,
  Flex,
  FormatNumber,
  HStack,
  Image,
  Span,
  Stack,
  type StackProps,
} from '@chakra-ui/react'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends StackProps {
  data: CategoryItemData
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { data, ...rest } = props
  return (
    <Stack bg="bg.muted" gap="1" {...rest}>
      <Image draggable={false} src={data.src} boxSize="full" objectFit="cover" alt={data.title} />
      <Flex padding="3" textStyle="sm" align="flex-start">
        <Stack gap="0" flex="1">
          <Box fontWeight="semibold">{data.title}</Box>
          <Box color="fg.muted" lineClamp={1}>
            {data.description}
          </Box>
        </Stack>
        <HStack gap="1">
          <Span color="colorPalette.fg" fontWeight="semibold">
            <FormatNumber style="currency" currency={data.currency} value={data.priceOverride} />
          </Span>
          <Span color="fg.muted" textDecoration="line-through">
            <FormatNumber style="currency" currency={data.currency} value={data.price} />
          </Span>
        </HStack>
      </Flex>
    </Stack>
  )
}
