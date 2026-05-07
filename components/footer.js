import { Box, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  const date = process.env.NEXT_PUBLIC_BUILD_DATE ?? 'unknown'
  return (
    <Box
      as="footer"
      mt={10}
      pt={6}
      fontSize="xs"
      color={muted}
      borderTopWidth="1px"
      borderTopColor={useColorModeValue('borderLight', 'borderDark')}
    >
      <Box as="span" color="accent">
        //
      </Box>{' '}
      last_updated: {date}
    </Box>
  )
}

export default Footer
