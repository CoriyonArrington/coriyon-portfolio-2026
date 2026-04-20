'use client'

import { Box } from '@chakra-ui/react'
import { useIsMounted } from './use-is-mounted'

interface TimerProgressProps {
  selected: boolean
}

export const TimerProgress = (props: TimerProgressProps) => {
  const { selected } = props
  const mounted = useIsMounted()
  return (
    <Box mt="2" h="1" w="120px" bg="bg" overflow="hidden" rounded="full" opacity={selected ? 1 : 0}>
      <Box
        w="full"
        h="full"
        bg="colorPalette.solid"
        animation="slide-to-left-full 5s forwards"
        animationPlayState={mounted ? 'running' : 'paused'}
      />
    </Box>
  )
}
