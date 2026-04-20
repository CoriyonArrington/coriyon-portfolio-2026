'use client'

import { ChakraProvider, Box } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'
import { ColorModeProvider } from './color-mode'
import { system } from './theme'
import { createContext, useContext, useEffect, useState } from 'react'

export type ColorPalette = 'green' | 'blue' | 'purple' | 'orange' | 'pink'

interface ThemeColorContextType {
  colorPalette: ColorPalette
  setColorPalette: (color: ColorPalette) => void
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined)

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext)
  if (!context) throw new Error('useThemeColor must be used within Provider')
  return context
}

export const Provider = (props: PropsWithChildren) => {
  const [colorPalette, setColorPalette] = useState<ColorPalette>('green')

  useEffect(() => {
    const saved = localStorage.getItem('coriyon-theme-color') as ColorPalette
    if (saved) setColorPalette(saved)
  }, [])

  const handleSetColor = (color: ColorPalette) => {
    setColorPalette(color)
    localStorage.setItem('coriyon-theme-color', color)
  }

  return (
    <ChakraProvider value={system}>
      <ThemeColorContext.Provider value={{ colorPalette, setColorPalette: handleSetColor }}>
        <ColorModeProvider defaultTheme="system" enableSystem>
          {/* display="contents" ensures this wrapper doesn't break CSS grids/flex, but still passes down the CSS variables! */}
          <Box display="contents" colorPalette={colorPalette}>
            {props.children}
          </Box>
        </ColorModeProvider>
      </ThemeColorContext.Provider>
    </ChakraProvider>
  )
}