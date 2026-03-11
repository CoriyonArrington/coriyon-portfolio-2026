import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      colorPalette: 'green',
      fontFamily: 'body', 
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'var(--font-heading), sans-serif' },
        body: { value: 'var(--font-body), sans-serif' },
      },
      colors: {
        green: {
          50: { value: '#E7F6ED' },
          100: { value: '#D1EDDB' },
          200: { value: '#A3DBB7' },
          300: { value: '#75C993' },
          400: { value: '#47B76F' },
          500: { value: '#20844B' }, 
          600: { value: '#1A6B3D' },
          700: { value: '#13512E' },
          800: { value: '#0D3820' },
          900: { value: '#061E11' },
        },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: '0.375rem' },
        l2: { value: '0.5rem' },
        l3: { value: '0.75rem' },
      },
      colors: {
        bg: {
          // The absolute base layer (Page body). True black in dark mode.
          canvas: {
            value: { _light: '#ffffff', _dark: '#000000' },
          },
          // Elevated surfaces (Navbar, Footer, Cards). Just barely off-black so they stand out against the canvas.
          panel: {
            value: { _light: '#ffffff', _dark: '#0a0a0a' },
          },
          // Hover states and secondary backgrounds
          muted: {
            value: { _light: '{colors.slate.100}', _dark: '#111113' },
          },
          // Your custom tokens, now natively matching your manual overrides
          subtle: {
            value: { _light: '{colors.slate.50}', _dark: '#000000' },
          },
          emphasized: {
            value: { _light: '{colors.slate.100}', _dark: '#000000' },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)