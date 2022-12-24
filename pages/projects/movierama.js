import {
  Container,
  Button,
  Link,
  List,
  ListItem,
  Center,
  Image
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { Title } from '../../components/project'
import P from '../../components/paragraph'
import { IoEarth, IoLogoGithub } from 'react-icons/io5'
import Section from '../../components/section'

const Work = () => (
  <Layout title="movierama">
    <Container>
      <Title>movierama</Title>
      <Center my={6}>
        <Image src="/images/projects/movierama.png" alt="icon" />
      </Center>
      <P>One of my first recreational projects back in the jQuery days.</P>
      <P>
        See the newest movies from the iMDb API. Search for movies and see their
        details.
      </P>
      <P>
        Tools and languages used: <i>Javascript</i>, <i>jQuery</i> and{' '}
        <i>Bootstrap</i>.
      </P>
      <Section delay={0.2}>
        <List marginTop={2}>
          <ListItem>
            <Link
              href="https://github.com/geokal94/movierama"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                Source Code
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://geokal94.github.io/movierama/"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="ghost" colorScheme="teal" leftIcon={<IoEarth />}>
                Website
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
