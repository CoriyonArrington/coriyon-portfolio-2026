import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    body: {
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
          canvas: {
            value: { _light: '#ffffff', _dark: '#000000' },
          },
          panel: {
            value: { _light: '#ffffff', _dark: '#0a0a0a' },
          },
          muted: {
            value: { _light: '#f4f4f5', _dark: '#171717' }, // Neutral gray
          },
          subtle: {
            value: { _light: '#fafafa', _dark: '#0f0f0f' }, // Neutral gray
          },
          emphasized: {
            value: { _light: '#f5f5f5', _dark: '#121212' }, // Neutral gray
          },
        },
        fg: {
          default: {
            value: { _light: '#0f0f0f', _dark: '#fafafa' },
          },
          muted: {
            value: { _light: '#525252', _dark: '#a3a3a3' }, // Neutral gray
          },
          subtle: {
            value: { _light: '#a3a3a3', _dark: '#525252' }, // Neutral gray
          },
        },
        border: {
          subtle: {
            value: { _light: '#e5e5e5', _dark: '#262626' }, // Neutral gray
          },
          muted: {
            value: { _light: '#d4d4d4', _dark: '#404040' }, // Neutral gray
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)