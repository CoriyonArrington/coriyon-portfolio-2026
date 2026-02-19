import { Image, Link, Stack, type StackProps } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import type { CategoryItemData } from './data'

interface CategoryItemProps extends StackProps {
  data: CategoryItemData
}

export const CategoryItem = (props: CategoryItemProps) => {
  const { data, ...rest } = props
  return (
    <Stack gap="3" {...rest}>
      <Image draggable={false} src={data.src} boxSize="full" objectFit="cover" alt={data.title} />
      <Link fontWeight="medium" href={data.url} alignSelf="flex-start">
        {data.title} <LuArrowRight />
      </Link>
    </Stack>
  )
}
