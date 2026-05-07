import { Box } from '@chakra-ui/react'

const Footer = () => {
  const date = process.env.NEXT_PUBLIC_BUILD_DATE ?? 'unknown'
  return (
    <Box
      as="footer"
      mt={10}
      pt={6}
      fontSize="xs"
      color="muted"
      borderTopWidth="1px"
      borderTopColor="border"
    >
      <Box as="span" color="accent">
        //
      </Box>{' '}
      last_updated: {date}
    </Box>
  )
}

export default Footer
