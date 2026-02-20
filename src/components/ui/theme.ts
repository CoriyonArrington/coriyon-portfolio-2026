import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
      colorPalette: 'green',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'var(--font-heading)' },
        body: { value: 'var(--font-body)' },
      },
      colors: {
        // Redefining the default green scale to anchor on your #20844B hex
        green: {
          50: { value: '#E7F6ED' },
          100: { value: '#D1EDDB' },
          200: { value: '#A3DBB7' },
          300: { value: '#75C993' },
          400: { value: '#47B76F' },
          500: { value: '#20844B' }, // New primary brand color
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
          // Adding depth with cool slate tones instead of flat grays
          subtle: {
            value: { _light: '{colors.slate.50}', _dark: '#111113' },
          },
          emphasized: {
            value: { _light: '{colors.slate.100}', _dark: '#1A1A1D' },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)