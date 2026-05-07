import { useEffect, useState, useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Input,
  Stack,
  useColorModeValue,
  useColorMode
} from '@chakra-ui/react'

const buildCommands = ({ toggleColorMode }) => [
  {
    id: 'github',
    label: 'open github',
    hint: '↗',
    run: () => window.open('https://github.com/geokal94', '_blank', 'noopener,noreferrer')
  },
  {
    id: 'linkedin',
    label: 'open linkedin',
    hint: '↗',
    run: () =>
      window.open('https://www.linkedin.com/in/giorgos-kallis/', '_blank', 'noopener,noreferrer')
  },
  {
    id: 'email',
    label: 'send email',
    hint: '✉',
    run: () => {
      window.location.href = 'mailto:hello@giorgoskallis.dev'
    }
  },
  {
    id: 'source',
    label: 'view source',
    hint: '↗',
    run: () =>
      window.open('https://github.com/geokal94/portfolio', '_blank', 'noopener,noreferrer')
  },
  {
    id: 'theme',
    label: 'toggle theme',
    hint: '◐',
    run: () => toggleColorMode()
  },
  {
    id: 'jump-work',
    label: 'jump to selected work',
    hint: '↓',
    run: () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  },
  {
    id: 'jump-experience',
    label: 'jump to experience',
    hint: '↓',
    run: () =>
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
  },
  {
    id: 'jump-contact',
    label: 'jump to contact',
    hint: '↓',
    run: () =>
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
]

const CommandPalette = ({ isOpen, onClose }) => {
  const { toggleColorMode } = useColorMode()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const commands = buildCommands({ toggleColorMode })
  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  useEffect(() => {
    setActive(0)
  }, [query])

  const onKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(filtered.length - 1, a + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(0, a - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = filtered[active]
      if (cmd) {
        cmd.run()
        onClose()
      }
    }
  }

  const bg = useColorModeValue('bgLight', 'bgDark')
  const border = useColorModeValue('borderLight', 'borderDark')
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  const activeBg = useColorModeValue('rgba(0,0,0,0.05)', 'rgba(255,255,255,0.04)')

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay backdropFilter="blur(6px)" bg="blackAlpha.500" />
      <ModalContent
        bg={bg}
        borderWidth="1px"
        borderColor={border}
        fontFamily="var(--font-mono)"
      >
        <ModalBody p={0}>
          <Box borderBottomWidth="1px" borderBottomColor={border} px={4} py={3}>
            <Box as="span" color="accent" mr={2}>
              ~ $
            </Box>
            <Input
              ref={inputRef}
              variant="unstyled"
              placeholder="type a command..."
              aria-label="command palette search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onKey}
              w="calc(100% - 40px)"
            />
          </Box>
          <Stack spacing={0} maxH="320px" overflowY="auto" py={2}>
            {filtered.length === 0 && (
              <Box px={4} py={3} color={muted} fontSize="sm">
                no matches
              </Box>
            )}
            {filtered.map((c, i) => (
              <Box
                key={c.id}
                px={4}
                py={2}
                cursor="pointer"
                bg={i === active ? activeBg : 'transparent'}
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  c.run()
                  onClose()
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                fontSize="sm"
              >
                <Box>
                  <Box as="span" color="accent" mr={2}>
                    →
                  </Box>
                  {c.label}
                </Box>
                <Box color={muted}>{c.hint}</Box>
              </Box>
            ))}
          </Stack>
          <Box
            borderTopWidth="1px"
            borderTopColor={border}
            px={4}
            py={2}
            color={muted}
            fontSize="xs"
            display="flex"
            gap={4}
          >
            <Box>↑↓ navigate</Box>
            <Box>↵ select</Box>
            <Box>esc close</Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CommandPalette
