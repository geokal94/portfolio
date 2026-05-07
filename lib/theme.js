import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
  // Dark (primary)
  bgDark: '#0b0d10',
  panelDark: '#15181d',
  textDark: '#d6dde6',
  mutedDark: '#6b7280',
  borderDark: 'rgba(255,255,255,0.08)',

  // Light
  bgLight: '#f6f5f1',
  panelLight: '#ebe7df',
  textLight: '#1c1c1f',
  mutedLight: '#5f6368',
  borderLight: 'rgba(0,0,0,0.10)',

  // Accents (shared)
  accent: '#5cf6b9',   // terminal green — prompts, labels
  key: '#74a8ff',      // syntax: keys
  string: '#ffb27a',   // syntax: strings
  err: '#ff5f56'
}

const styles = {
  global: props => ({
    body: {
      bg: mode(colors.bgLight, colors.bgDark)(props),
      color: mode(colors.textLight, colors.textDark)(props)
    },
    '::selection': {
      bg: 'rgba(92,246,185,0.25)'
    }
  })
}

const components = {
  Heading: {
    baseStyle: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      letterSpacing: '-0.02em'
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode(colors.textLight, colors.textDark)(props),
      textDecoration: 'underline',
      textDecorationColor: mode(colors.mutedLight, colors.mutedDark)(props),
      textUnderlineOffset: '3px',
      _hover: {
        textDecorationColor: colors.accent
      }
    })
  }
}

const fonts = {
  heading: 'var(--font-mono)',
  body: 'var(--font-mono)',
  mono: 'var(--font-mono)'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
