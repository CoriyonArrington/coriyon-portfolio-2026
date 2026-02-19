"use client"

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { IconButton, Stack } from "@chakra-ui/react"
import { useState } from "react"
import { LuMenu } from "react-icons/lu"
import { Logo } from "./logo"
import { NavbarLinks } from "./navbar-links"

export const MobilePopover = () => {
  const [open, setOpen] = useState(false)

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton variant="ghost" aria-label="Open Menu" display={{ md: "none" }}>
          <LuMenu />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Logo />
          </DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
          <Stack gap="6">
            <NavbarLinks />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  )
}