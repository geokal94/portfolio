import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m a Full Stack developer based in Athens, Greece
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Giorgos Kallis
          </Heading>
          <p>Full Stack Developer</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/profile.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About
        </Heading>
        <Paragraph>
          Giorgos is a Full Stack developer based in Athens. He has a passion
          for solving real life problems with code and loves to experiment with
          new technologies. He has experience in building web and mobile
          applications, both on the front-end and back-end.
        </Paragraph>
        <Box align="center" my={4}>
          <Link href="/projects" as={NextLink} passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My portfolio
            </Button>
          </Link>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1994</BioYear>
          Born in Athens, Greece.
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Worked at Travelsoft, a software travel agency in Athens, Greece.
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Worked at iNTERAD Web Media Company, a custom software solutions
          company in Athens, Greece.
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Completed the Bachelor of Science Program in the Department of
          Informatics and Telecommunications at Ethikon kai Kapodistriakon
          Panepistimion Athinon.
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Worked at 7L International, a software development company in Athens,
          Greece.
        </BioSection>
        <BioSection>
          <BioYear>2020 to present</BioYear>
          <br />
          Working at Pitcher AG, a software Sales Enablement company in Zurich,
          Switzerland.
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Fitness, Music, Reading, Traveling and of course, Coding!
        </Paragraph>
      </Section>

      <Box align="center" my={4}>
        <Link
          href="https://giorgoskallisgr.devdojo.com/"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
            Visit my blog
          </Button>
        </Link>
      </Box>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link
              href="https://github.com/geokal94"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @geokal94
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://www.linkedin.com/in/giorgos-kallis/"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                @Giorgos Kallis
              </Button>
            </Link>
          </ListItem>
        </List>

        <Box align="center" my={4}>
          <NextLink href="/posts" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Popular posts
            </Button>
          </NextLink>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
