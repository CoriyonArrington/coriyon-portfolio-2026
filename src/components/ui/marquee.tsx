"use client"

import { Box, Flex, type BoxProps } from '@chakra-ui/react'
import * as React from 'react'

export interface MarqueeProps extends BoxProps {
  pauseOnHover?: boolean
  speed?: string
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  function Marquee(props, ref) {
    // We default to gap="6" (which is 1.5rem / 24px) to keep the spacing uniform
    const { children, pauseOnHover = false, speed = '40s', gap = '6', ...rest } = props

    return (
      <Box
        ref={ref}
        overflow="hidden"
        userSelect="none"
        display="flex"
        {...rest}
      >
        <Flex
          gap={gap}
          w="max-content"
          animation={`marquee ${speed} linear infinite`}
          css={{
            // Maps the gap into a CSS variable so the keyframes can do the exact math
            '--gap-size': 'var(--spacing-6, 1.5rem)',
            '@keyframes marquee': {
              '0%': { transform: 'translateX(0)' },
              // Shifts exactly half the container width minus half the gap to perfectly reset
              '100%': { transform: 'translateX(calc(-50% - (var(--gap-size) / 2)))' }, 
            },
            '&:hover': {
              animationPlayState: pauseOnHover ? 'paused' : 'running',
            },
          }}
        >
          {/* We duplicate the children array here to create the infinite loop effect seamlessly */}
          {children}
          {children}
        </Flex>
      </Box>
    )
  }
)