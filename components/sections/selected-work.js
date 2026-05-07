import { Box, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import MonoCard from '../mono-card'

// TODO(content): Giorgos to fill in real entries. Each entry should describe
// the engineering problem and decision, NOT the Pitcher product (NDA-safe).
// Keep `title` action-led, `problem` to one sentence, `tech` to ≤5 items.
const ENTRIES = [
  {
    title: 'Built async ingestion pipeline (TODO: replace)',
    problem:
      'Replace this with one sentence on why it was hard — scale, correctness, latency, edge case.',
    tech: ['python', 'sqs', 'postgres', 'aws']
  },
  {
    title: 'Designed access-control model (TODO: replace)',
    problem:
      'Replace this with one sentence on the engineering tension you resolved.',
    tech: ['typescript', 'postgres', 'redis']
  },
  {
    title: 'Migrated legacy frontend (TODO: replace)',
    problem:
      'Replace this with one sentence on what made the migration risky.',
    tech: ['react', 'next.js', 'typescript']
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

const Entry = ({ title, problem, tech }) => (
  <Box pb={5} borderBottomWidth="1px" borderBottomColor="border" _last={{ borderBottomWidth: 0, pb: 0 }}>
    <Box fontWeight={500} mb={1}>
      {title}
    </Box>
    <Box color="muted" fontSize="sm" mb={3}>
      {problem}
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

const SelectedWork = () => (
  <MonoCard label="selected work" id="work">
    <Stack spacing={5}>
      {ENTRIES.map(e => (
        <Entry key={e.title} {...e} />
      ))}
    </Stack>
  </MonoCard>
)

export default SelectedWork
