import { Box, Center, type StackProps } from '@chakra-ui/react'
import { LuCirclePlay } from 'react-icons/lu'

export const VideoPlaceholder = (props: StackProps) => (
  <Center bg="bg.muted" color="fg.subtle" {...props}>
    <Box pos="relative" top="-20">
      <LuCirclePlay size="48px" />
    </Box>
  </Center>
)
