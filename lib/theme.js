import { extendTheme } from '@chakra-ui/react'

const colors = {
  bg: '#0b0d10',
  panel: '#15181d',
  text: '#d6dde6',
  muted: '#8b95a3',
  border: 'rgba(255,255,255,0.08)',

  accent: '#5cf6b9',
  key: '#74a8ff',
  string: '#ffb27a',
  err: '#ff5f56'
}

const styles = {
  global: {
    body: {
      bg: colors.bg,
      color: colors.text
    },
    '::selection': {
      bg: 'rgba(92,246,185,0.25)'
    }
  }
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
    baseStyle: {
      color: colors.text,
      textDecoration: 'underline',
      textDecorationColor: colors.muted,
      textUnderlineOffset: '3px',
      _hover: {
        textDecorationColor: colors.accent
      }
    }
  }
}

const fonts = {
  heading: 'var(--font-mono)',
  body: 'var(--font-mono)',
  mono: 'var(--font-mono)'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
