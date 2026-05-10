import { Box, Stack, Wrap, WrapItem, Link } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const ENTRIES = [
  {
    title: 'home-scanner',
    description:
      'Telegram alerts for new Greek apartment rentals on spitogatos.gr. Scrapes hourly and pings me when a listing matches my saved filters.',
    href: 'https://github.com/geokal94/home-scanner',
    // TODO(content): confirm/edit the stack pills below.
    tech: ['python', 'telegram bot', 'cron']
  }
]

const Pill = ({ children }) => (
  <Box
    px={2}
    py={0.5}
    borderRadius="sm"
    borderWidth="1px"
    borderColor="border"
    fontSize="2xs"
    letterSpacing="0.08em"
    color="muted"
    textTransform="lowercase"
  >
    {children}
  </Box>
)

const Entry = ({ title, description, href, tech }) => (
  <Box pb={5} borderBottomWidth="1px" borderBottomColor="border" _last={{ borderBottomWidth: 0, pb: 0 }}>
    <Box display="flex" alignItems="baseline" gap={3} flexWrap="wrap" mb={1}>
      <Box fontWeight={500}>{title}</Box>
      {href && (
        <Box as="span" fontSize="xs">
          <Box as="span" color="muted">[</Box>
          <Link href={href} target="_blank" rel="noopener noreferrer">
            github ↗
          </Link>
          <Box as="span" color="muted">]</Box>
        </Box>
      )}
    </Box>
    <Box color="muted" fontSize="sm" mb={3}>
      {description}
    </Box>
    <Wrap spacing={2}>
      {tech.map(t => (
        <WrapItem key={t}>
          <Pill>{t}</Pill>
        </WrapItem>
      ))}
    </Wrap>
  </Box>
)

const Projects = () => (
  <MonoCard label="projects" id="projects">
    <Stack spacing={5}>
      {ENTRIES.map(e => (
        <Entry key={e.title} {...e} />
      ))}
    </Stack>
  </MonoCard>
)

export default Projects
