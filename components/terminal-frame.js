import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const Dot = ({ color }) => (
  <Box w="11px" h="11px" borderRadius="full" bg={color} />
)

const TerminalFrame = ({ title = 'giorgos.dev', children, ...rest }) => {
  const panelBg = useColorModeValue('panelLight', 'panelDark')
  const borderColor = useColorModeValue('borderLight', 'borderDark')

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      bg={useColorModeValue('bgLight', 'bgDark')}
      {...rest}
    >
      <Flex
        align="center"
        gap={2}
        px={4}
        py={2.5}
        bg={panelBg}
        borderBottomWidth="1px"
        borderBottomColor={borderColor}
      >
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />
        <Box
          ml={3}
          fontSize="xs"
          opacity={0.55}
          color={useColorModeValue('mutedLight', 'mutedDark')}
        >
          {title}
        </Box>
      </Flex>
      <Box p={6}>{children}</Box>
    </Box>
  )
}

export default TerminalFrame
