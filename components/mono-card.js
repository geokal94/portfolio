import { Box } from '@chakra-ui/react'

const MonoCard = ({ label, children, id, ...rest }) => (
  <Box
    as="section"
    id={id}
    borderWidth="1px"
    borderColor="border"
    borderRadius="md"
    p={{ base: 5, md: 6 }}
    bg="rgba(255,255,255,0.015)"
    {...rest}
  >
    {label && (
      <Box
        fontSize="xs"
        letterSpacing="0.18em"
        textTransform="uppercase"
        color="accent"
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

export default MonoCard
