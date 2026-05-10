import { Stack, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Hero from '../components/sections/hero'
import About from '../components/sections/about'
// import Principles from '../components/sections/principles'
import Projects from '../components/sections/projects'
import Experience from '../components/sections/experience'
import Now from '../components/sections/now'
import Contact from '../components/sections/contact'
import Footer from '../components/footer'
import SectionReveal from '../components/section-reveal'

const Home = () => (
  <Layout>
    <Box as="h1" position="absolute" w="1px" h="1px" overflow="hidden" sx={{ clipPath: 'inset(50%)' }}>
      Giorgos Kallis — Senior Full Stack Engineer
    </Box>
    <Stack spacing={6}>
      <Hero />
      <SectionReveal>
        <About />
      </SectionReveal>
      {/* <SectionReveal>
        <Principles />
      </SectionReveal> */}
      <SectionReveal>
        <Experience />
      </SectionReveal>
      <SectionReveal>
        <Now />
      </SectionReveal>
      <SectionReveal>
        <Projects />
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
