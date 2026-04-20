'use client'

import { Button, Popover, Portal, Stack, HStack, Box } from '@chakra-ui/react'
import { LuCheck, LuChevronDown } from 'react-icons/lu'
import { useThemeColor, ColorPalette } from '@/components/ui/provider'
import { useUiSounds } from '@/hooks/use-ui-sounds'
import { useState, useEffect } from 'react'

const palettes: { value: ColorPalette; label: string; hex: string }[] = [
  { value: 'green', label: 'Green', hex: '#20844B' },
  { value: 'blue', label: 'Blue', hex: '#2b6cb0' },
  { value: 'purple', label: 'Purple', hex: '#6b46c1' },
  { value: 'orange', label: 'Orange', hex: '#c05621' },
  { value: 'pink', label: 'Pink', hex: '#b83280' }
]

export const ColorPaletteToggle = () => {
  const { colorPalette, setColorPalette } = useThemeColor()
  const { playClick, playHover } = useUiSounds()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // OPTIMIZATION: Hydration safety to prevent mismatch on initial load
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Popover.Root 
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={{ placement: 'bottom', offset: { mainAxis: 12 } }}
    >
      <Popover.Trigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          px="2"
          color={open ? 'fg' : 'fg.muted'}
          bg={open ? 'bg.muted' : 'transparent'}
          _hover={{ color: 'fg', bg: 'bg.muted' }}
          aria-label="Select theme color" 
          onMouseEnter={playHover}
          onClick={playClick}
        >
          {/* FIX: Force absolute token resolution based on the state to bypass the Button's gray context */}
          {mounted && colorPalette ? (
            <Box boxSize="3.5" rounded="full" bg={`${colorPalette}.500`} shadow="sm" />
          ) : (
            <Box boxSize="3.5" rounded="full" bg="gray.500" shadow="sm" />
          )}
          <LuChevronDown size="14" />
        </Button>
      </Popover.Trigger>
      
      <Portal>
        <Popover.Positioner zIndex={2100}>
          <Popover.Content 
            width="fit-content" 
            p="2" 
            borderRadius="md" 
            boxShadow="md" 
            bg="bg.panel"
            borderWidth="1px"
            borderColor="border.subtle"
            outline="none"
          >
            <Stack gap="1">
              {palettes.map((p) => (
                <Button
                  key={p.value}
                  // FIX: Explicitly pass the color palette to the active button so the "subtle" variant uses the theme color!
                  colorPalette={colorPalette === p.value ? colorPalette : 'gray'}
                  variant={colorPalette === p.value ? 'subtle' : 'ghost'}
                  size="sm"
                  justifyContent="flex-start"
                  onClick={() => {
                    playClick()
                    setColorPalette(p.value)
                    setOpen(false)
                  }}
                  onMouseEnter={playHover}
                  px="3"
                >
                  <HStack w="full" justify="space-between" gap="4">
                    <HStack gap="3">
                      <Box boxSize="3" rounded="full" bg={p.hex} shadow="inner" />
                      <Box 
                        fontWeight={colorPalette === p.value ? 'medium' : 'normal'}
                        color={colorPalette === p.value ? 'fg' : 'fg.muted'}
                      >
                        {p.label}
                      </Box>
                    </HStack>
                    {colorPalette === p.value && <LuCheck size="14" />}
                  </HStack>
                </Button>
              ))}
            </Stack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}