import { Container, Heading, Text, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
// import { SimpleGrid } from '@chakra-ui/react'
// import { WorkGridItem } from '../components/grid-item'
// import thumbMovierama from '../public/images/projects/movierama.png'

const Projects = () => (
  <Layout title="Projects">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Projects
      </Heading>

      <Section>
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" opacity={0.8}>
            Something cool is coming...
          </Text>
        </Box>
      </Section>

      {/*
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="movierama"
            title="MovieRama"
            thumbnail={thumbMovierama}
          >
            Search latest movies from IMDb
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      */}
    </Container>
  </Layout>
)

export default Projects
export { getServerSideProps } from '../components/chakra'
