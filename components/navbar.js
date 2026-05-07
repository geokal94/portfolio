import {
  Container,
  Box,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import Logo from './logo'
import ThemeToggleButton from './theme-toggle-button'

const Navbar = props => {
  const bg = useColorModeValue('rgba(246,245,241,0.6)', 'rgba(11,13,16,0.6)')
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={bg}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('borderLight', 'borderDark')}
      {...props}
    >
      <Container display="flex" p={3} maxW="container.md" align="center" justify="space-between">
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>
        <Flex align="center" gap={2}>
          <ThemeToggleButton />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
