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
