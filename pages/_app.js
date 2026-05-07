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
