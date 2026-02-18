'use client'

import { Icon, IconButton, Popover, Portal } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { LuAlignRight, LuX } from 'react-icons/lu'

export const MobilePopover = (props: PropsWithChildren) => {
  return (
    <Popover.Root
      positioning={{
        placement: 'bottom',
        overflowPadding: 0,
        offset: { mainAxis: 12 },
      }}
    >
      <Popover.Context>
        {(context) => (
          <Popover.Trigger asChild>
            <IconButton
              aria-label="Open Menu"
              variant="ghost"
              size="sm"
              colorPalette="gray"
              hideFrom="md"
            >
              <Icon size="md">{context.open ? <LuX /> : <LuAlignRight />}</Icon>
            </IconButton>
          </Popover.Trigger>
        )}
      </Popover.Context>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            textStyle="md"
            boxShadow="none"
            borderRadius="none"
            maxW="unset"
            px="4"
            py="6"
            width="var(--available-width)"
            height="var(--available-height)"
            {...props}
          />
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
