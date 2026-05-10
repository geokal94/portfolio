import { Stack } from '@chakra-ui/react'
import MonoCard from '../mono-card'
import TimelineEntry from '../timeline-entry'

const Experience = () => (
  <MonoCard label="experience" id="experience">
    <Stack spacing={0}>
      <TimelineEntry
        years="2020 → now"
        role="Senior Full Stack Engineer"
        company="Pitcher AG"
        sub="Zurich · Remote · Frontend → Backend → Senior Full Stack"
      />
      <TimelineEntry
        years="2020"
        role="Software Engineer"
        company="7Layers"
        sub="Athens"
      />
      <TimelineEntry
        years="2019 – 20"
        role="Full Stack Engineer"
        company="iNTERAD"
        sub="Athens, Greece"
      />
      <TimelineEntry
        last
        years="2018 – 19"
        role="Software Engineer (intern)"
        company="Travelsoft"
        sub="Athens, Greece"
      />
    </Stack>
  </MonoCard>
)

export default Experience
