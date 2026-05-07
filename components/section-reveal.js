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
