import Link from 'next/link'
import { Box } from '@chakra-ui/react'

const Logo = () => (
  <Link href="/" scroll={false} style={{ textDecoration: 'none' }}>
    <Box
      display="inline-flex"
      alignItems="center"
      fontSize="sm"
      color="text"
      fontWeight={500}
    >
      <Box as="span" color="accent" mr={2}>
        ~/
      </Box>
      giorgos
    </Box>
  </Link>
)

export default Logo
