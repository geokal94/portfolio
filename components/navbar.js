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
  const border = useColorModeValue('borderLight', 'borderDark')
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={bg}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      borderBottomWidth="1px"
      borderBottomColor={border}
      {...props}
    >
      <Container display="flex" p={3} maxW="container.md" align="center" justify="space-between">
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>
        <Flex align="center" gap={2}>
          <Box
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            px={2}
            py={1}
            borderRadius="sm"
            borderWidth="1px"
            borderColor={border}
            fontSize="xs"
            color={muted}
            cursor="pointer"
            role="button"
            tabIndex={0}
            aria-label="open command palette"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true })
              )
            }
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                window.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'k', metaKey: true })
                )
              }
            }}
          >
            ⌘K
          </Box>
          <ThemeToggleButton />
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
