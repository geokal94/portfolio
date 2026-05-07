import { Box, Flex } from '@chakra-ui/react'

const Dot = ({ color }) => (
  <Box w="11px" h="11px" borderRadius="full" bg={color} />
)

const TerminalFrame = ({ title = 'giorgoskallis.dev', children, ...rest }) => (
  <Box
    borderRadius="lg"
    overflow="hidden"
    borderWidth="1px"
    borderColor="border"
    bg="bg"
    {...rest}
  >
    <Flex
      align="center"
      gap={2}
      px={4}
      py={2.5}
      bg="panel"
      borderBottomWidth="1px"
      borderBottomColor="border"
    >
      <Dot color="#ff5f56" />
      <Dot color="#ffbd2e" />
      <Dot color="#27c93f" />
      <Box ml={3} fontSize="xs" opacity={0.55} color="muted">
        {title}
      </Box>
    </Flex>
    <Box p={6}>{children}</Box>
  </Box>
)

export default TerminalFrame
