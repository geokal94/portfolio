import { Box, useColorModeValue } from '@chakra-ui/react'

const MonoCard = ({ label, children, id, ...rest }) => {
  const borderColor = useColorModeValue('borderLight', 'borderDark')
  const labelColor = 'accent'

  return (
    <Box
      as="section"
      id={id}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={{ base: 5, md: 6 }}
      bg={useColorModeValue('rgba(0,0,0,0.015)', 'rgba(255,255,255,0.015)')}
      {...rest}
    >
      {label && (
        <Box
          fontSize="xs"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={labelColor}
          mb={4}
        >
          // {label}
        </Box>
      )}
      <Box fontSize={{ base: 'sm', md: 'md' }} lineHeight={1.75}>
        {children}
      </Box>
    </Box>
  )
}

export default MonoCard
