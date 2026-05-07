import { Stack, Box, useColorModeValue } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const Line = ({ children }) => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box>
      <Box as="span" color="accent">
        →
      </Box>{' '}
      <Box as="span" color={useColorModeValue('textLight', 'textDark')}>
        {children}
      </Box>
      <Box as="span" color={muted}>
        {/* trailing space for breathing room */}
      </Box>
    </Box>
  )
}

const Principles = () => (
  <MonoCard label="principles" id="principles">
    <Stack spacing={3}>
      <Line>Systems that hold up under real use.</Line>
      <Line>Code other engineers can navigate.</Line>
      <Line>Shipping end to end.</Line>
    </Stack>
  </MonoCard>
)

export default Principles
