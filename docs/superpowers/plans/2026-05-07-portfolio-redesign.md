# Portfolio v2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage of giorgoskallis.dev as a terminal/dev-native single-page portfolio: terminal-framed hero with typewriter intro, monospace section cards, ⌘K command palette, polished light + dark themes — same Next.js + Chakra stack.

**Architecture:** Single homepage (`pages/index.js`) composed of section components living in `components/sections/`. Reusable primitives — `TerminalFrame`, `MonoCard`, `Typewriter`, `CommandPalette`, `TimelineEntry` — live in `components/`. Theme tokens centralized in `lib/theme.js`. CSS animations for typewriter/cursor; Framer Motion for scroll reveals; all motion gated on `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, Chakra UI 2, Framer Motion 7, React 18, JetBrains Mono via `next/font`. Drops `three.js`.

**Spec:** `docs/superpowers/specs/2026-05-07-portfolio-redesign-design.md`

**Testing approach:** This project has no test runner configured. The plan does NOT add one — adding Jest for two small logic checks would be scope creep. Verification is manual at each task: run `yarn dev`, open `http://localhost:3000`, confirm the described behavior. Where automation is cheap (lint, build), it's used.

---

## Phase 1 — Cleanup and Foundation

### Task 1: Remove unused files and dependencies

**Files:**
- Delete: `lib/model.js`, `components/bio.js`, `components/grid-item.js`, `components/paragraph.js`, `components/icons/heart.js`, `pages/posts.js`, `pages/projects.js`, `pages/projects/`, `public/images/profile.jpg`, `public/images/projects/`, `public/images/contents/`
- Modify: `package.json`

- [ ] **Step 1: Delete unused source files**

```bash
rm -f lib/model.js components/bio.js components/grid-item.js components/paragraph.js components/icons/heart.js
rm -f pages/posts.js pages/projects.js
rm -rf pages/projects
rm -f public/images/profile.jpg
rm -rf public/images/projects public/images/contents
```

- [ ] **Step 2: Remove `three` from package.json dependencies**

Edit `package.json` — remove the line `"three": "^0.143.0",` from the `dependencies` block.

- [ ] **Step 3: Reinstall to update lockfile**

Run: `yarn install`
Expected: lockfile updates, `three` and its sub-deps drop out, no errors.

- [ ] **Step 4: Verify dev server still boots**

Run: `yarn dev`
Open `http://localhost:3000`. Expected: home page still renders (will be broken-looking — that's fine; we're rebuilding it). No 500 errors. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -u package.json yarn.lock lib components pages public
git commit -m "chore: drop unused files and three.js dependency"
```

---

### Task 2: Set up JetBrains Mono via next/font

**Files:**
- Modify: `pages/_app.js`
- Modify: `styles/globals.css`
- Delete content: `components/fonts.js` (becomes a no-op or is removed)

- [ ] **Step 1: Add JetBrains Mono using next/font**

Edit `pages/_app.js` to load JetBrains Mono and expose it as a CSS variable. Replace the existing imports/component with:

```jsx
import { JetBrains_Mono } from 'next/font/google'
import Layout from '../components/layouts/main'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import '../styles/globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap'
})

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <div className={jetbrainsMono.variable} style={{ fontFamily: 'var(--font-mono)' }}>
        <Layout router={router}>
          <AnimatePresence mode="wait" initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </div>
    </Chakra>
  )
}

export default Website
```

Note: `exitBeforeEnter` is removed because it was deprecated; replaced with `mode="wait"`.

- [ ] **Step 2: Update globals.css to use the CSS variable**

Replace the contents of `styles/globals.css` with:

```css
:root {
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}

html,
body {
  font-family: var(--font-mono);
}

/* Smooth scroll for in-page anchor jumps. */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 3: Delete the old fonts component**

```bash
rm -f components/fonts.js
```

- [ ] **Step 4: Verify the dev server boots and uses the mono font**

Run: `yarn dev`. Open `http://localhost:3000`. Body text should now render in JetBrains Mono. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "feat: load JetBrains Mono via next/font"
```

---

### Task 3: Rewrite theme tokens

**Files:**
- Modify: `lib/theme.js`

- [ ] **Step 1: Replace `lib/theme.js` with the new tokens**

```js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
  // Dark (primary)
  bgDark: '#0b0d10',
  panelDark: '#15181d',
  textDark: '#d6dde6',
  mutedDark: '#6b7280',
  borderDark: 'rgba(255,255,255,0.08)',

  // Light
  bgLight: '#f6f5f1',
  panelLight: '#ebe7df',
  textLight: '#1c1c1f',
  mutedLight: '#5f6368',
  borderLight: 'rgba(0,0,0,0.10)',

  // Accents (shared)
  accent: '#5cf6b9',   // terminal green — prompts, labels
  key: '#74a8ff',      // syntax: keys
  string: '#ffb27a',   // syntax: strings
  err: '#ff5f56'
}

const styles = {
  global: props => ({
    body: {
      bg: mode(colors.bgLight, colors.bgDark)(props),
      color: mode(colors.textLight, colors.textDark)(props)
    },
    '::selection': {
      bg: 'rgba(92,246,185,0.25)'
    }
  })
}

const components = {
  Heading: {
    baseStyle: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      letterSpacing: '-0.02em'
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode(colors.textLight, colors.textDark)(props),
      textDecoration: 'underline',
      textDecorationColor: mode(colors.mutedLight, colors.mutedDark)(props),
      textUnderlineOffset: '3px',
      _hover: {
        textDecorationColor: colors.accent
      }
    })
  }
}

const fonts = {
  heading: 'var(--font-mono)',
  body: 'var(--font-mono)',
  mono: 'var(--font-mono)'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
```

- [ ] **Step 2: Verify theme loads**

Run: `yarn dev`. Open `http://localhost:3000`. Page should now show the dark `#0b0d10` background and the muted text color. Toggle the theme button and confirm light mode shows `#f6f5f1`. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add -u
git commit -m "feat: rewrite theme tokens for terminal aesthetic"
```

---

## Phase 2 — Core Primitives

### Task 4: Build `TerminalFrame` component

**Files:**
- Create: `components/terminal-frame.js`

- [ ] **Step 1: Write `components/terminal-frame.js`**

```jsx
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
```

- [ ] **Step 2: Smoke-test by adding it to the page**

Temporarily edit `pages/index.js` so the body is just:

```jsx
import TerminalFrame from '../components/terminal-frame'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <TerminalFrame>hello world</TerminalFrame>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. Confirm a terminal-style window with the three traffic-light dots renders, with "hello world" inside. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/terminal-frame.js pages/index.js
git commit -m "feat: add TerminalFrame primitive"
```

---

### Task 5: Build `MonoCard` component

**Files:**
- Create: `components/mono-card.js`

- [ ] **Step 1: Write `components/mono-card.js`**

```jsx
import { Box, useColorModeValue } from '@chakra-ui/react'

const MonoCard = ({ label, children, id, ...rest }) => {
  const borderColor = useColorModeValue('borderLight', 'borderDark')
  const labelColor = 'accent'

  return (
    <Box
      as="section"
      id={id}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      p={{ base: 5, md: 6 }}
      bg={useColorModeValue('rgba(0,0,0,0.015)', 'rgba(255,255,255,0.015)')}
      {...rest}
    >
      {label && (
        <Box
          fontSize="xs"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={labelColor}
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
}

export default MonoCard
```

- [ ] **Step 2: Smoke-test**

Edit `pages/index.js` to:

```jsx
import { Stack } from '@chakra-ui/react'
import TerminalFrame from '../components/terminal-frame'
import MonoCard from '../components/mono-card'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <Stack spacing={6}>
      <TerminalFrame>hello world</TerminalFrame>
      <MonoCard label="about">A short test paragraph.</MonoCard>
    </Stack>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. Confirm the card renders with `// ABOUT` label in green and a thin border. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/mono-card.js pages/index.js
git commit -m "feat: add MonoCard primitive"
```

---

### Task 6: Build `Typewriter` component with sessionStorage gate

**Files:**
- Create: `components/typewriter.js`

- [ ] **Step 1: Write `components/typewriter.js`**

```jsx
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

const STORAGE_KEY = 'gk_intro_played'

// Reduced-motion query matches at module load is not safe (SSR);
// computed on mount instead.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const alreadyPlayed = () =>
  typeof window !== 'undefined' &&
  window.sessionStorage.getItem(STORAGE_KEY) === '1'

/**
 * Plays a sequence of typewriter "lines" once per browser session, then
 * shows the final state. On revisits (sessionStorage flag set) or with
 * prefers-reduced-motion, all lines render in their final state immediately.
 *
 * `lines` shape:
 *   [{ type: 'type', text: 'whoami', cps?: number, prefix?: ReactNode },
 *    { type: 'render', node: <ReactNode /> },
 *    { type: 'pause', ms: 200 }]
 */
const Typewriter = ({ lines, onComplete }) => {
  const [step, setStep] = useState(0)
  const [typed, setTyped] = useState('')
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    if (alreadyPlayed() || prefersReducedMotion()) {
      setSkip(true)
      setStep(lines.length)
      onComplete?.()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (skip) return
    if (step >= lines.length) {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
      onComplete?.()
      return
    }
    const current = lines[step]

    if (current.type === 'type') {
      const cps = current.cps ?? 24
      const totalMs = (current.text.length / cps) * 1000
      const start = performance.now()
      let raf
      const tick = now => {
        const elapsed = now - start
        const n = Math.min(
          current.text.length,
          Math.floor((elapsed / totalMs) * current.text.length)
        )
        setTyped(current.text.slice(0, n))
        if (n < current.text.length) {
          raf = requestAnimationFrame(tick)
        } else {
          setTyped('')
          setStep(s => s + 1)
        }
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

    if (current.type === 'render') {
      setStep(s => s + 1)
      return
    }

    if (current.type === 'pause') {
      const t = setTimeout(() => setStep(s => s + 1), current.ms)
      return () => clearTimeout(t)
    }
  }, [step, skip]) // eslint-disable-line react-hooks/exhaustive-deps

  // Render: if skipping, show all lines in their final state.
  if (skip) {
    return (
      <Box>
        {lines.map((l, i) => {
          if (l.type === 'type')
            return (
              <Box key={i}>
                {l.prefix}
                {l.text}
              </Box>
            )
          if (l.type === 'render') return <Box key={i}>{l.node}</Box>
          return null
        })}
      </Box>
    )
  }

  // Animating: show all completed steps + the in-progress typed text.
  return (
    <Box>
      {lines.slice(0, step).map((l, i) => {
        if (l.type === 'type')
          return (
            <Box key={i}>
              {l.prefix}
              {l.text}
            </Box>
          )
        if (l.type === 'render') return <Box key={i}>{l.node}</Box>
        return null
      })}
      {step < lines.length && lines[step].type === 'type' && (
        <Box>
          {lines[step].prefix}
          {typed}
        </Box>
      )}
    </Box>
  )
}

export default Typewriter
```

- [ ] **Step 2: Smoke-test**

Replace `pages/index.js` with:

```jsx
import Typewriter from '../components/typewriter'
import TerminalFrame from '../components/terminal-frame'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <TerminalFrame>
      <Typewriter
        lines={[
          { type: 'type', text: 'whoami', prefix: <span style={{ color: '#5cf6b9' }}>~ $ </span> },
          { type: 'pause', ms: 250 },
          { type: 'render', node: 'giorgos /* kallis */' }
        ]}
      />
    </TerminalFrame>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. On first load you should see `~ $ whoami` typed character-by-character, then `giorgos /* kallis */` reveal. Reload the page in the same tab — the intro should appear instantly (no replay). Open a new tab — the intro should play again. Stop the server.

- [ ] **Step 3: Verify reduced-motion behavior**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce". Reload (in a fresh tab). Intro should appear instantly.

- [ ] **Step 4: Commit**

```bash
git add components/typewriter.js pages/index.js
git commit -m "feat: add Typewriter component with session + reduced-motion gates"
```

---

### Task 7: Build `TimelineEntry` component

**Files:**
- Create: `components/timeline-entry.js`

- [ ] **Step 1: Write `components/timeline-entry.js`**

```jsx
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'

const TimelineEntry = ({ years, role, company, sub, last = false }) => {
  const borderColor = useColorModeValue('borderLight', 'borderDark')
  const muted = useColorModeValue('mutedLight', 'mutedDark')

  return (
    <Flex gap={5} pb={last ? 0 : 5}>
      <Box minW="92px" color={muted} fontSize="sm" pt="2px">
        {years}
      </Box>
      <Box
        borderLeftWidth={last ? '0' : '1px'}
        borderLeftColor={borderColor}
        pl={5}
        flex={1}
        position="relative"
      >
        <Box
          position="absolute"
          left="-5px"
          top="6px"
          w="9px"
          h="9px"
          borderRadius="full"
          bg="accent"
        />
        <Box fontWeight={500}>{role}</Box>
        <Box color={muted} fontSize="sm">
          {company}
        </Box>
        {sub && (
          <Box mt={2} fontSize="xs" color={muted}>
            {sub}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default TimelineEntry
```

- [ ] **Step 2: Smoke-test**

Replace `pages/index.js` with a quick test:

```jsx
import { Stack } from '@chakra-ui/react'
import MonoCard from '../components/mono-card'
import TimelineEntry from '../components/timeline-entry'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <MonoCard label="experience">
      <Stack spacing={0}>
        <TimelineEntry
          years="2020 → now"
          role="Senior Full-Stack Engineer"
          company="Pitcher AG"
          sub="Frontend → Backend → Senior Full-Stack."
        />
        <TimelineEntry years="2019 – 20" role="Frontend Engineer" company="Access-management platform" />
        <TimelineEntry last years="2018 – 19" role="Frontend Engineer" company="Travel-booking startup" />
      </Stack>
    </MonoCard>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. Confirm a vertical timeline renders with green dots, dates on the left, role/company on the right. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/timeline-entry.js pages/index.js
git commit -m "feat: add TimelineEntry primitive"
```

---

## Phase 3 — Sections

### Task 8: Build the Hero section

**Files:**
- Create: `components/sections/hero.js`

- [ ] **Step 1: Write `components/sections/hero.js`**

```jsx
import { Box, useColorModeValue } from '@chakra-ui/react'
import TerminalFrame from '../terminal-frame'
import Typewriter from '../typewriter'

const Prompt = () => (
  <Box as="span" color="accent" fontWeight={500}>
    ~ ${' '}
  </Box>
)

const Cursor = () => (
  <Box
    as="span"
    display="inline-block"
    w="9px"
    h="16px"
    bg="accent"
    verticalAlign="-2px"
    sx={{
      animation: 'gk-blink 1s steps(1) infinite',
      '@keyframes gk-blink': { '50%': { opacity: 0 } },
      '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
      }
    }}
  />
)

const Hero = () => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  const text = useColorModeValue('textLight', 'textDark')

  return (
    <TerminalFrame>
      <Typewriter
        lines={[
          { type: 'type', text: 'whoami', prefix: <Prompt /> },
          { type: 'pause', ms: 250 },
          {
            type: 'render',
            node: (
              <Box
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight={500}
                letterSpacing="-0.02em"
                lineHeight={1.05}
                color={text}
                mt={1}
                mb={1}
              >
                giorgos{' '}
                <Box as="span" color="accent">
                  /* kallis */
                </Box>
              </Box>
            )
          },
          {
            type: 'render',
            node: (
              <Box color={muted} fontSize={{ base: 'xs', md: 'sm' }}>
                senior full-stack · athens · 2018→
              </Box>
            )
          },
          { type: 'pause', ms: 200 },
          {
            type: 'render',
            node: (
              <Box mt={3} color={muted} fontSize={{ base: 'xs', md: 'sm' }}>
                <Box as="span" color="accent">
                  status:
                </Box>{' '}
                shipping at pitcher · open to interesting problems
              </Box>
            )
          }
        ]}
      />
      <Box mt={4}>
        <Prompt />
        <Cursor />
      </Box>
    </TerminalFrame>
  )
}

export default Hero
```

- [ ] **Step 2: Smoke-test**

Replace `pages/index.js`:

```jsx
import Hero from '../components/sections/hero'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <Hero />
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. The terminal frame should type out `~ $ whoami`, reveal the big name, the role/location line, then the status line, then a blinking prompt. Reload — appears instantly. Toggle theme — light mode shows the same content with proper contrast. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.js pages/index.js
git commit -m "feat: add Hero section"
```

---

### Task 9: Build the About section

**Files:**
- Create: `components/sections/about.js`

- [ ] **Step 1: Write `components/sections/about.js`**

```jsx
import MonoCard from '../mono-card'

const About = () => (
  <MonoCard label="about" id="about">
    Senior Full-Stack Engineer with 7+ years building production software.
    Currently at Pitcher AG, shipping B2B SaaS to Fortune 500 sales
    organizations. Backend-leaning, comfortable across the stack, focused
    on systems that hold up under real use.
  </MonoCard>
)

export default About
```

- [ ] **Step 2: Smoke-test inline by appending to the home page**

Update `pages/index.js`:

```jsx
import { Stack } from '@chakra-ui/react'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Layout from '../components/layouts/article'

const Home = () => (
  <Layout>
    <Stack spacing={6}>
      <Hero />
      <About />
    </Stack>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

Run: `yarn dev`. Confirm About card sits below the hero with `// ABOUT` label and the new copy. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/about.js pages/index.js
git commit -m "feat: add About section"
```

---

### Task 10: Build the Principles section

**Files:**
- Create: `components/sections/principles.js`

- [ ] **Step 1: Write `components/sections/principles.js`**

```jsx
import { Stack, Box, useColorModeValue } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const Line = ({ children }) => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box>
      <Box as="span" color="accent">
        →
      </Box>{' '}
      <Box as="span" color={useColorModeValue('textLight', 'textDark')}>
        {children}
      </Box>
      <Box as="span" color={muted}>
        {/* trailing space for breathing room */}
      </Box>
    </Box>
  )
}

const Principles = () => (
  <MonoCard label="principles" id="principles">
    <Stack spacing={3}>
      <Line>Systems that hold up under real use.</Line>
      <Line>Code other engineers can navigate.</Line>
      <Line>Shipping end to end.</Line>
    </Stack>
  </MonoCard>
)

export default Principles
```

- [ ] **Step 2: Verify**

Add `<Principles />` to the home page Stack. Run: `yarn dev`. Confirm three lines with green `→` markers render. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/principles.js pages/index.js
git commit -m "feat: add Principles section"
```

---

### Task 11: Build the Selected Work section (with placeholder content)

**Files:**
- Create: `components/sections/selected-work.js`

- [ ] **Step 1: Write `components/sections/selected-work.js`**

```jsx
import {
  Box,
  Stack,
  Wrap,
  WrapItem,
  useColorModeValue
} from '@chakra-ui/react'
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

const Pill = ({ children }) => {
  const border = useColorModeValue('borderLight', 'borderDark')
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box
      px={2}
      py={0.5}
      borderRadius="sm"
      borderWidth="1px"
      borderColor={border}
      fontSize="2xs"
      letterSpacing="0.08em"
      color={muted}
      textTransform="lowercase"
    >
      {children}
    </Box>
  )
}

const Entry = ({ title, problem, tech }) => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  const border = useColorModeValue('borderLight', 'borderDark')
  return (
    <Box pb={5} borderBottomWidth="1px" borderBottomColor={border} _last={{ borderBottomWidth: 0, pb: 0 }}>
      <Box fontWeight={500} mb={1}>
        {title}
      </Box>
      <Box color={muted} fontSize="sm" mb={3}>
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
}

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
```

- [ ] **Step 2: Verify**

Add `<SelectedWork />` to the home page Stack. Run: `yarn dev`. Confirm three placeholder entries render with title, problem text, and tech pills. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/selected-work.js pages/index.js
git commit -m "feat: add Selected Work section with placeholder entries"
```

---

### Task 12: Build the Experience section

**Files:**
- Create: `components/sections/experience.js`

- [ ] **Step 1: Write `components/sections/experience.js`**

```jsx
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
```

- [ ] **Step 2: Verify**

Add `<Experience />` to the page. Run: `yarn dev`. Confirm the timeline renders inside the card. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/experience.js pages/index.js
git commit -m "feat: add Experience section"
```

---

### Task 13: Build the Now section

**Files:**
- Create: `components/sections/now.js`

- [ ] **Step 1: Write `components/sections/now.js`**

```jsx
import MonoCard from '../mono-card'

// TODO(content): user to keep this updated as focus shifts.
const Now = () => (
  <MonoCard label="now" id="now">
    Currently building data-pipeline tooling at Pitcher AG and going deeper
    on distributed-systems patterns. Outside work: lifting, reading, and
    learning music theory.
  </MonoCard>
)

export default Now
```

- [ ] **Step 2: Verify and commit**

Add `<Now />` to the page. Run: `yarn dev`. Confirm. Stop. Commit.

```bash
git add components/sections/now.js pages/index.js
git commit -m "feat: add Now section"
```

---

### Task 14: Build the Contact section

**Files:**
- Create: `components/sections/contact.js`

- [ ] **Step 1: Write `components/sections/contact.js`**

```jsx
import { Stack, Link, Box, useColorModeValue } from '@chakra-ui/react'
import MonoCard from '../mono-card'

const Item = ({ label, href }) => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  return (
    <Box>
      <Box as="span" color="accent">
        →
      </Box>{' '}
      <Box as="span" color={muted}>
        [
      </Box>
      <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">
        {label}
      </Link>
      <Box as="span" color={muted}>
        ]
      </Box>
    </Box>
  )
}

const Contact = () => (
  <MonoCard label="contact" id="contact">
    <Stack spacing={2}>
      <Item label="github @geokal94" href="https://github.com/geokal94" />
      <Item label="linkedin /in/giorgos-kallis" href="https://www.linkedin.com/in/giorgos-kallis/" />
      <Item label="email" href="mailto:hello@giorgoskallis.dev" />
    </Stack>
  </MonoCard>
)

export default Contact
```

Note: the email above is a placeholder — change it once the user confirms their preferred address.

- [ ] **Step 2: Verify**

Add `<Contact />` to the page. Run: `yarn dev`. Confirm three links render with `[label]` brackets. Hover should change underline to accent green. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact.js pages/index.js
git commit -m "feat: add Contact section"
```

---

### Task 15: Build the Footer with build timestamp

**Files:**
- Create: `lib/build-time.js`
- Create: `components/footer.js`
- Modify: `next.config.js`

- [ ] **Step 1: Inject build time via `next.config.js`**

Replace `next.config.js` with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10)
  }
}

module.exports = nextConfig
```

- [ ] **Step 2: Write `components/footer.js`**

```jsx
import { Box, useColorModeValue } from '@chakra-ui/react'

const Footer = () => {
  const muted = useColorModeValue('mutedLight', 'mutedDark')
  const date = process.env.NEXT_PUBLIC_BUILD_DATE
  return (
    <Box
      as="footer"
      mt={10}
      pt={6}
      fontSize="xs"
      color={muted}
      borderTopWidth="1px"
      borderTopColor={useColorModeValue('borderLight', 'borderDark')}
    >
      <Box as="span" color="accent">
        //
      </Box>{' '}
      last_updated: {date}
    </Box>
  )
}

export default Footer
```

- [ ] **Step 3: Verify**

Add `<Footer />` to the page. Run: `yarn dev`. Confirm the footer shows today's date in `YYYY-MM-DD` form. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/footer.js lib pages/index.js next.config.js
git commit -m "feat: add Footer with build-time stamp"
```

Note: `lib/build-time.js` ended up unnecessary — delete it if you created it. The build date is supplied by `NEXT_PUBLIC_BUILD_DATE`.

---

## Phase 4 — Layout, Navbar, Final Composition

### Task 16: Rewrite the Navbar

**Files:**
- Modify: `components/navbar.js`
- Modify: `components/logo.js`

- [ ] **Step 1: Rewrite `components/logo.js`**

```jsx
import Link from 'next/link'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Logo = () => {
  const text = useColorModeValue('textLight', 'textDark')
  return (
    <Link href="/" scroll={false} style={{ textDecoration: 'none' }}>
      <Box
        display="inline-flex"
        alignItems="center"
        fontSize="sm"
        color={text}
        fontWeight={500}
      >
        <Box as="span" color="accent" mr={2}>
          ~/
        </Box>
        giorgos
      </Box>
    </Link>
  )
}

export default Logo
```

- [ ] **Step 2: Rewrite `components/navbar.js`**

```jsx
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
```

- [ ] **Step 3: Verify**

Run: `yarn dev`. Confirm navbar shows `~/giorgos` on the left and the theme toggle on the right, with a subtle blur and border. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/navbar.js components/logo.js
git commit -m "feat: simplify navbar to logo + theme toggle"
```

---

### Task 17: Rewrite the main layout

**Files:**
- Modify: `components/layouts/main.js`
- Modify: `components/layouts/article.js`

- [ ] **Step 1: Update `components/layouts/main.js`**

```jsx
import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import NavBar from '../navbar'

const Main = ({ children, router }) => (
  <Box as="main" pb={12}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Giorgos Kallis — Senior Full-Stack Engineer, Athens." />
      <meta name="author" content="Giorgos Kallis" />
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      <meta property="og:site_name" content="Giorgos Kallis" />
      <meta name="og:title" content="Giorgos Kallis" />
      <meta property="og:type" content="website" />
      <title>Giorgos Kallis — Senior Full-Stack Engineer</title>
    </Head>

    <a
      href="#about"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
    >
      Skip to content
    </a>

    <NavBar path={router.asPath} />

    <Container maxW="container.md" pt={24}>
      {children}
    </Container>
  </Box>
)

export default Main
```

- [ ] **Step 2: Trim `components/layouts/article.js`**

Replace its contents with:

```jsx
import { motion } from 'framer-motion'
import Head from 'next/head'

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 }
}

const Layout = ({ children, title }) => {
  const t = title ? `${title} — Giorgos Kallis` : undefined
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ position: 'relative' }}
    >
      {t && (
        <Head>
          <title>{t}</title>
          <meta name="twitter:title" content={t} />
          <meta property="og:title" content={t} />
        </Head>
      )}
      {children}
    </motion.article>
  )
}

export default Layout
```

- [ ] **Step 3: Verify**

Run: `yarn dev`. Confirm content sits centered, with proper top spacing under the fixed navbar, and no leftover `GridItemStyle` import error. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/layouts/main.js components/layouts/article.js
git commit -m "feat: clean up main layout and article wrapper"
```

---

### Task 18: Compose the final homepage with scroll reveals

**Files:**
- Modify: `pages/index.js`
- Create: `components/section-reveal.js`

- [ ] **Step 1: Write `components/section-reveal.js`**

```jsx
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
}

const SectionReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    variants={variants}
  >
    {children}
  </motion.div>
)

export default SectionReveal
```

Note: Framer Motion already respects `prefers-reduced-motion` by default for `whileInView` reveals.

- [ ] **Step 2: Replace `pages/index.js`**

```jsx
import { Stack } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
import Principles from '../components/sections/principles'
import SelectedWork from '../components/sections/selected-work'
import Experience from '../components/sections/experience'
import Now from '../components/sections/now'
import Contact from '../components/sections/contact'
import Footer from '../components/footer'
import SectionReveal from '../components/section-reveal'

const Home = () => (
  <Layout>
    <Stack spacing={6}>
      <Hero />
      <SectionReveal>
        <About />
      </SectionReveal>
      <SectionReveal>
        <Principles />
      </SectionReveal>
      <SectionReveal>
        <SelectedWork />
      </SectionReveal>
      <SectionReveal>
        <Experience />
      </SectionReveal>
      <SectionReveal>
        <Now />
      </SectionReveal>
      <SectionReveal>
        <Contact />
      </SectionReveal>
      <Footer />
    </Stack>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
```

- [ ] **Step 3: Verify the full page**

Run: `yarn dev`. Open `http://localhost:3000`. You should see:
1. Navbar with `~/giorgos` and theme toggle.
2. Hero terminal frame typing the intro on first load.
3. Each section card fading in as you scroll.
4. Footer with `// last_updated: <today>`.

Toggle the theme — every section should remain readable and well-styled in light mode. Reload — hero should appear instantly (sessionStorage). Open a private tab — hero should replay.

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/section-reveal.js pages/index.js
git commit -m "feat: compose final homepage with scroll reveals"
```

---

## Phase 5 — Cmd+K Command Palette

### Task 19: Build the CommandPalette component

**Files:**
- Create: `components/command-palette.js`

- [ ] **Step 1: Write `components/command-palette.js`**

```jsx
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
    run: () => window.open('https://github.com/geokal94', '_blank')
  },
  {
    id: 'linkedin',
    label: 'open linkedin',
    hint: '↗',
    run: () =>
      window.open('https://www.linkedin.com/in/giorgos-kallis/', '_blank')
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
      window.open('https://github.com/geokal94/portfolio', '_blank')
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
```

- [ ] **Step 2: Wire it into `_app.js` with global ⌘K shortcut**

Edit `pages/_app.js` — add palette state and key listener. Replace the file with:

```jsx
import { useEffect, useState } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import Layout from '../components/layouts/main'
import { AnimatePresence } from 'framer-motion'
import Chakra from '../components/chakra'
import CommandPalette from '../components/command-palette'
import '../styles/globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap'
})

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function Website({ Component, pageProps, router }) {
  const [paletteOpen, setPaletteOpen] = useState(false)

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      } else if (e.key === 'Escape') {
        setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Chakra cookies={pageProps.cookies}>
      <div className={jetbrainsMono.variable} style={{ fontFamily: 'var(--font-mono)' }}>
        <Layout router={router}>
          <AnimatePresence mode="wait" initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
        <CommandPalette
          isOpen={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
      </div>
    </Chakra>
  )
}

export default Website
```

- [ ] **Step 3: Verify**

Run: `yarn dev`. Press `⌘K` (macOS) or `Ctrl+K` (Linux/Windows). The palette should open. Type "git" — list filters to GitHub commands. Use ↑/↓ to move, Enter to select. Press Esc to close. Confirm `toggle theme` works. Confirm `jump to experience` smooth-scrolls. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/command-palette.js pages/_app.js
git commit -m "feat: add Cmd+K command palette"
```

---

## Phase 6 — Polish

### Task 20: Add a hint that ⌘K is available

**Files:**
- Modify: `components/navbar.js`

- [ ] **Step 1: Add a small `⌘K` hint pill to the navbar**

Edit `components/navbar.js` — inside the right-hand `Flex`, before `<ThemeToggleButton />`, add:

```jsx
import { Box } from '@chakra-ui/react'
// ... within the Flex on the right:
<Box
  display={{ base: 'none', md: 'flex' }}
  alignItems="center"
  px={2}
  py={1}
  borderRadius="sm"
  borderWidth="1px"
  borderColor={useColorModeValue('borderLight', 'borderDark')}
  fontSize="xs"
  color={useColorModeValue('mutedLight', 'mutedDark')}
  cursor="pointer"
  onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
>
  ⌘K
</Box>
```

The synthetic `KeyboardEvent` re-uses the global listener so the hint and shortcut share a single code path.

- [ ] **Step 2: Verify**

Run: `yarn dev`. The `⌘K` pill should appear in the navbar on desktop (hidden on small screens). Click it — the palette opens. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add components/navbar.js
git commit -m "feat: add Cmd+K hint pill in navbar"
```

---

### Task 21: Final accessibility pass

**Files:**
- Modify: any component where audit reveals issues

- [ ] **Step 1: Run a build**

Run: `yarn build`
Expected: build completes without errors.

- [ ] **Step 2: Run Lighthouse against `yarn start`**

In one terminal: `yarn start`
In another: open `http://localhost:3000` in a fresh Chrome incognito window. Open DevTools → Lighthouse → run for Desktop.

Targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95

Record the actual scores in your commit message at the end of this task. If any score is below target, identify the top 2 issues and fix them inline (typical issues: missing alt text on icons, low contrast on muted color in light mode, missing `aria-label` on icon-only buttons).

- [ ] **Step 3: Verify reduced-motion behavior in production build**

In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce". Reload (in incognito so sessionStorage is fresh). The hero intro should appear instantly. Scroll reveals should appear instantly.

- [ ] **Step 4: Verify keyboard navigation**

Open the live site, press Tab repeatedly. Confirm: skip-link is reachable first; theme toggle and Cmd+K hint are reachable; Cmd+K opens palette and arrow keys / Enter / Esc all work.

- [ ] **Step 5: Stop server, then commit any fixes**

```bash
git add -u
git commit -m "fix: a11y and lighthouse polish (perf=X a11y=Y bp=Z)"
```

(If no fixes were needed, skip this commit.)

---

### Task 22: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the README**

```markdown
# giorgoskallis.dev

Personal site of Giorgos Kallis — Senior Full-Stack Engineer.

## Stack

- Next.js 16
- Chakra UI
- Framer Motion
- JetBrains Mono via `next/font`

## Develop

```bash
yarn install
yarn dev
```

## Build

```bash
yarn build && yarn start
```

## Layout

```
$PROJECT_ROOT
├── pages           # Next.js pages
├── components
│   ├── sections    # Homepage section components
│   └── ...         # Reusable primitives (TerminalFrame, MonoCard, etc.)
├── lib             # Theme + helpers
└── public          # Static assets
```

## Keyboard

- `⌘K` / `Ctrl+K` — command palette
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README for v2"
```

---

## Self-Review

**Spec coverage:**
- Hero with typewriter + status line → Task 8
- About / Principles / Selected Work / Experience / Now / Contact → Tasks 9–14
- Footer with `last_updated` → Task 15
- Navbar simplified, theme toggle kept → Task 16
- Cmd+K palette with all listed commands → Tasks 19, 20
- Theme tokens (dark + light) → Task 3
- Component primitives (`TerminalFrame`, `MonoCard`, `Typewriter`, `TimelineEntry`, `CommandPalette`) → Tasks 4, 5, 6, 7, 19
- Removal of profile photo, dog model, hobbies block, posts/projects pages → Task 1
- Reduced-motion gates → Tasks 6, 18, 21
- Drop `three.js` dependency → Task 1
- JetBrains Mono via `next/font` → Task 2
- A11y check, Lighthouse → Task 21

**Placeholder content** is explicitly TODO-marked in:
- Selected Work (Task 11) — three placeholder entries with `TODO(content)` notes
- Experience (Task 12) — anonymized prior roles flagged for confirmation
- Now (Task 13) — TODO for content owner
- Contact (Task 14) — placeholder email noted in step 1
- Hero (Task 8) — `status:` line written with a sensible default; user may want to swap

These are intentional — the spec acknowledges them as "user-supplied content."

**Type / API consistency:**
- `MonoCard` accepts `label`, `id`, `children` consistently in Tasks 5, 9–14.
- `TimelineEntry` accepts `years`, `role`, `company`, `sub`, `last` consistently in Tasks 7, 12.
- `Typewriter` line shape `{ type: 'type'|'render'|'pause', ... }` consistent in Tasks 6, 8.
- Color tokens `accent`, `mutedLight/Dark`, `borderLight/Dark`, `bgLight/Dark`, `textLight/Dark` defined once in Task 3, consumed throughout.

No gaps found.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-07-portfolio-redesign.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
