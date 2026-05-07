import { Stack, Box } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const Line = ({ children }) => (
  <Box>
    <Box as="span" color="accent">
      →
    </Box>{' '}
    <Box as="span" color="text">
      {children}
    </Box>
  </Box>
)

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
