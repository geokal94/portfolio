import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'

import thumbFullStackTransition from '../public/images/contents/full-stack-transition.jpeg'
import thumbDjango from '../public/images/contents/django.png'
import thumbDjangoSentry from '../public/images/contents/django-sentry.jpeg'

const Posts = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        My Blog Posts (More coming soon...)
      </Heading>

      <Section delay={0.1}>
        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            title="How I transitioned from Frontend to Full Stack Development"
            thumbnail={thumbFullStackTransition}
            href="https://giorgoskallisgr.devdojo.com/how-i-transitioned-from-frontend-to-full-stack-development"
          />
          <GridItem
            title="Optimizing Performance in Django: Tips and Techniques"
            thumbnail={thumbDjango}
            href="https://giorgoskallisgr.devdojo.com/optimizing-performance-in-django-tips-and-techniques"
          />
          <GridItem
            title="How to overcome the N+1 Sentry error in Django"
            thumbnail={thumbDjangoSentry}
            href="https://giorgoskallisgr.devdojo.com/how-to-overcome-the-n1-sentry-error-in-django"
          />
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Posts
export { getServerSideProps } from '../components/chakra'
