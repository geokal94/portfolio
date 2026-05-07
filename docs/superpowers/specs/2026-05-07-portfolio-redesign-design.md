# Portfolio Redesign — Design Spec

**Date:** 2026-05-07
**Author:** Giorgos Kallis (with Claude)
**Status:** Approved, pending implementation plan

## Goal

Redesign giorgoskallis.dev to feel modern and impressive — distinctively dev-native rather than the current generic "craftz.dog clone" aesthetic. Same content (with light additions), same Next.js + Chakra stack. Visual redesign only — not a stack rebuild.

## Personality and direction

**Visual direction:** Terminal / dev-native. Monospace typography, command-line metaphors, system-y palette. Inspired by Anthropic, Fly.io, Tailscale.

**Layout pattern:** Terminal-framed hero, then clean monospace cards for content. The terminal is a *signature element*, not a metaphor that consumes the whole page — keeps the site readable for recruiters while remaining distinctive.

**Motion:** Subtle. One typewriter intro on first load (skipped on revisits via `sessionStorage`), gentle scroll fade-ins on sections, polished hover states. Restraint over volume — well-timed 200ms transitions, no scanlines or glitch effects.

## Sections

The homepage is a single scrollable page with the following sections, in order:

### 1. Hero
- Terminal-framed window (red/yellow/green dots, fake title bar reading `giorgos.dev`)
- Typewriter intro on first visit:
  1. Types `$ whoami`
  2. Reveals `giorgos /* kallis */` in large monospace
  3. Subtitle: `senior full-stack · athens · 2018→`
  4. Status line: `status: open to interesting problems`
  5. Blinking cursor at a fresh `$` prompt
- On revisits: hero appears in final state instantly, no replay
- Cursor keeps blinking persistently

### 2. About
- Card with `// about` label (small uppercase, accent color)
- 3 tight sentences distilled from the current bio. Existing copy is too long; trim to:
  > Senior Full-Stack Engineer with 7+ years building production software. Currently at Pitcher AG, shipping B2B SaaS to Fortune 500 sales organizations. Backend-leaning, comfortable across the stack, focused on systems that hold up.

### 3. Principles
- Card with `// principles` label
- 3 short lines (one each, clearly separated):
  - `Systems that hold up under real use.`
  - `Code other engineers can navigate.`
  - `Shipping end to end.`
- Lifted from the existing bio paragraph; no new content needed.

### 4. Selected Work
- Card with `// selected work` label
- 3–4 work entries, each structured as:
  - **Title** — short, action-led
  - **Problem** — one sentence on why it was hard
  - **Tech** — a short list of relevant tools
- NDA-safe — describes engineering problems, not the Pitcher product
- **Content placeholder:** the redesign ships with 4 scaffolded entries the user fills in. Implementation plan must include: clear `TODO` markers, sample copy, instructions on what each field should contain.

### 5. Experience
- Card with `// experience` label
- Vertical timeline; left column shows year range in mono, right column shows role + company
- Pitcher AG (2020 → present) shown with sub-progression beneath the main entry: Frontend Engineer → Backend Engineer → Senior Full-Stack Engineer
- Earlier roles (~2018–2020) anonymized — e.g. *"Travel-booking startup · 2018–19"*, *"Access-management platform · 2019–20"*. **Content placeholder:** user confirms exact descriptions / years during implementation.

### 6. Now
- Card with `// now` label
- One short paragraph on current focus. Editable in a single file, no CMS — easy to update.

### 7. Contact
- Card with `// contact` label
- GitHub, LinkedIn, email — styled as monospace `[link]` items, not buttons. Underline on hover.

### 8. Footer
- Small footer line, low contrast: `last_updated: <date>` — date stamped at build time.

### Removed from the current site
- Profile photo (terminal aesthetic doesn't pair with portraits; lives on LinkedIn)
- 3D dog model (`lib/model.js` and any `.glb` asset)
- "I ♥" hobbies block (cut for senior-engineer signal)
- Posts / Projects pages and any references in nav (already commented out — formalize the removal)
- `bio.js` and `grid-item.js` components (will be unused)

## Global features

### Cmd+K command palette
- Triggered by `⌘K` (or `Ctrl+K`) anywhere on the page
- Modal, monospace, keyboard-navigable (arrow keys, enter to select, esc to close)
- Initial commands:
  - `view source` — opens the GitHub repo
  - `email` — opens mailto link
  - `github` — opens GitHub profile
  - `linkedin` — opens LinkedIn profile
  - `toggle theme` — switches dark/light
  - `jump to work` / `jump to experience` / `jump to contact` — smooth-scrolls to the section
- Lightweight implementation — no `cmdk` library required if it adds bundle weight; a small custom modal is fine.

### Theme
- Dark mode is the primary, polished mode (terminal aesthetic is built for it)
- Light mode kept and theme toggle preserved, but light variant uses a pale-paper background with darker mono ink — should feel like reading printed code, not a different site
- Color tokens centralized in `lib/theme.js` overrides:
  - `bg`: `#0b0d10` (dark) / `#f6f5f1` (light)
  - `panel`: `#15181d` / `#ebe7df`
  - `text`: `#d6dde6` / `#1c1c1f`
  - `muted`: `#6b7280`
  - `accent`: `#5cf6b9` (terminal green) — used for prompts, labels, accents only
  - `key`: `#74a8ff`
  - `string`: `#ffb27a`
- Typography: monospace primary (`'JetBrains Mono', ui-monospace, monospace`). Falls back gracefully if JetBrains Mono isn't loaded.

## Components

The redesign introduces a small reusable primitive set:

- **`<TerminalFrame>`** — window chrome with traffic-light dots + title bar; wraps the hero
- **`<MonoCard>`** — a content card with `// label` heading + body, used for About / Principles / Selected Work / Experience / Now / Contact sections
- **`<Typewriter>`** — plays the hero intro once per session
- **`<CommandPalette>`** — modal Cmd+K palette
- **`<TimelineEntry>`** — used inside Experience

Each component is self-contained and consumes theme tokens — no inline color literals.

## Technical approach

### Stack changes
- **Keep:** Next.js 16, Chakra UI, Framer Motion, React 18
- **Remove:** `three.js` dependency (no 3D model), `lib/model.js`
- **Possibly add:** a single web font load for JetBrains Mono via `next/font`

### File-level changes (high-level — implementation plan will detail)
- Rewrite: `pages/index.js`, `lib/theme.js`, `components/navbar.js`, `components/layouts/main.js`
- New components: `components/terminal-frame.js`, `components/mono-card.js`, `components/typewriter.js`, `components/command-palette.js`, `components/timeline-entry.js`, `components/sections/*.js` (one per homepage section)
- Delete: `lib/model.js`, `components/bio.js`, `components/grid-item.js`, `pages/posts.js`, `pages/projects.js`, `pages/projects/`, the dog model under `public/`
- `package.json` — drop `three`

### Animation strategy
- Framer Motion for section fade-ins (`whileInView` with `once: true`)
- Plain CSS keyframes for typewriter and cursor blink (cheap, no JS overhead)
- All motion respects `prefers-reduced-motion` — if set, intro plays in final state instantly and scroll reveals are skipped

### Accessibility
- All animations gated on `prefers-reduced-motion`
- Cmd+K palette is keyboard-navigable, has focus trap, esc closes
- Color contrast meets WCAG AA in both themes
- Skip link to main content (existing layout doesn't have one — add)

## Out of scope (explicit non-goals)

- Stack migration (Tailwind, App Router, shadcn) — deferred to a possible v3
- Live data integrations (GitHub feed, blog RSS) — explicit user choice
- Per-project case study pages (`pages/projects/*`) — Selected Work cards are inline only
- A `posts` or blog page
- Custom 404 redesign
- Mobile-specific palette / nav rework beyond responsive defaults

## Risks and mitigations

- **Risk:** Terminal aesthetic feels gimmicky after the third visit.
  **Mitigation:** Typewriter plays once per session; cards are normal monospace text, not faux-shell prose; palette is opt-in.
- **Risk:** Selected Work placeholders ship and never get filled in.
  **Mitigation:** Implementation plan flags this as a content-required step before deploy; `TODO`s render as visible warnings in dev mode.
- **Risk:** Light theme looks like an afterthought.
  **Mitigation:** Spec mandates light variant gets the same polish pass; explicit color tokens for both modes.
- **Risk:** Bundle bloat from JetBrains Mono.
  **Mitigation:** Use `next/font` to self-host and subset; load only the weights actually used (likely 400, 500, 700).

## Success criteria

- Site renders correctly in dark + light modes, on desktop + mobile
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95
- No CLS from the typewriter intro (reserve space)
- Cmd+K works on macOS / Linux / Windows
- Reduced-motion preference respected
- All `TODO` markers for user-supplied content are clearly labeled in code

## Open questions for implementation

1. Specific copy for Selected Work cards — user-provided, can be filled inline once the structure ships
2. Specific years/descriptions for prior anonymized roles — same
3. Exact line for the hero `status:` indicator — user-provided
