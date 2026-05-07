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
