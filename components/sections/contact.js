import { Stack, Link, Box, useColorModeValue } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const Item = ({ label, href }) => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box>
      <Box as="span" color="accent">
        →
      </Box>{' '}
      <Box as="span" color={muted}>
        [
      </Box>
      <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {label}
      </Link>
      <Box as="span" color={muted}>
        ]
      </Box>
    </Box>
  )
}

const Contact = () => (
  <MonoCard label="contact" id="contact">
    <Stack spacing={2}>
      <Item label="github @geokal94" href="https://github.com/geokal94" />
      <Item label="linkedin /in/giorgos-kallis" href="https://www.linkedin.com/in/giorgos-kallis/" />
      <Item label="email" href="mailto:hello@giorgoskallis.dev" />
    </Stack>
  </MonoCard>
)

export default Contact
