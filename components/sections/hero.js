import { Box } from '@chakra-ui/react'
import TerminalFrame from '../terminal-frame'
import Typewriter from '../typewriter'

const Prompt = () => (
  <Box as="span" color="accent" fontWeight={500}>
    ~ ${' '}
  </Box>
)

const Cursor = () => (
  <Box
    as="span"
    display="inline-block"
    w="9px"
    h="16px"
    bg="accent"
    verticalAlign="-2px"
    sx={{
      animation: 'gk-blink 1s steps(1) infinite',
      '@keyframes gk-blink': { '50%': { opacity: 0 } },
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
      }
    }}
  />
)

const Hero = () => (
  <TerminalFrame id="hero-start">
    <Typewriter
      lines={[
        { type: 'type', text: 'whoami', prefix: <Prompt /> },
        { type: 'pause', ms: 250 },
        {
          type: 'render',
          node: (
            <Box
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight={500}
              letterSpacing="-0.02em"
              lineHeight={1.05}
              color="text"
              mt={1}
              mb={1}
            >
              Giorgos{' '}
              <Box as="span" color="accent">
                /* Kallis */
              </Box>
            </Box>
          )
        },
        {
          type: 'render',
          node: (
            <Box color="muted" fontSize={{ base: 'xs', md: 'sm' }}>
              Senior Full Stack · Athens, Greece
            </Box>
          )
        },
        { type: 'pause', ms: 200 },
        {
          type: 'render',
          node: (
            <Box mt={3} color="muted" fontSize={{ base: 'xs', md: 'sm' }}>
              <Box as="span" color="accent">
                status:
              </Box>{' '}
              open to interesting problems
            </Box>
          )
        }
      ]}
    />
    <Box mt={4}>
      <Prompt />
      <Cursor />
    </Box>
  </TerminalFrame>
)

export default Hero
