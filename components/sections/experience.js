import { Stack } from '@chakra-ui/react'
import MonoCard from '../mono-card'
import TimelineEntry from '../timeline-entry'

// TODO(content): confirm the wording for prior roles with the user.
const Experience = () => (
  <MonoCard label="experience" id="experience">
    <Stack spacing={0}>
      <TimelineEntry
        years="2020 → now"
        role="Senior Full-Stack Engineer"
        company="Pitcher AG"
        sub="Frontend → Backend → Senior Full-Stack. B2B SaaS for Fortune 500 sales orgs."
      />
      <TimelineEntry
        years="2019 – 20"
        role="Frontend Engineer"
        company="Access-management platform"
      />
      <TimelineEntry
        last
        years="2018 – 19"
        role="Frontend Engineer"
        company="Travel-booking startup"
      />
    </Stack>
  </MonoCard>
)

export default Experience
