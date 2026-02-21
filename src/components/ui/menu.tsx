"use client"

import { Menu as ChakraMenu, Portal } from "@chakra-ui/react"
import * as React from "react"

interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement | null>
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const { portalled = true, portalRef, ...rest } = props
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} />
        </ChakraMenu.Positioner>
      </Portal>
    )
  },
)

export const MenuRoot = ChakraMenu.Root
export const MenuItem = ChakraMenu.Item
export const MenuTrigger = ChakraMenu.Trigger