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
        Hello, I&apos;m a Senior Full Stack Engineer based in Athens, Greece
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Giorgos Kallis
          </Heading>
          <p>Full Stack Engineer</p>
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
              width={100}
              height={100}
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About
        </Heading>
        <Paragraph>
        I'm a Senior Full Stack Engineer with 7+ years of experience, 
        currently at Pitcher AG building B2B SaaS for Fortune 500
        sales organizations.

        My work leans backend but I've been comfortable across the stack throughout my career, from frontend to async processing pipelines and cloud infrastructure.
        
        I care about systems that hold up under real use, code that other engineers can navigate, and shipping things end-to-end.
        </Paragraph>
        {/* <Box align="center" my={4}>
          <Link href="/projects" as={NextLink} passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My portfolio
            </Button>
          </Link>
        </Box> */}
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <Paragraph>
        I grew up in Athens and studied Informatics & Telecommunications at the National and Kapodistrian University of Athens. I started as a frontend engineer at small Athens-based companies, working on travel booking, location-tracking, and access management software, before joining Pitcher AG in 2020. Six years later, I'm still there. I started as a Frontend Engineer, moved to backend, and now ship full-stack work as a Senior Engineer.
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Fitness, Music, Reading, Traveling and of course, Coding!
        </Paragraph>
      </Section>

      {/* <Box align="center" my={4}>
        <Link
          href="https://giorgoskallisgr.devdojo.com/"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
            Visit my blog
          </Button>
        </Link>
      </Box> */}

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

        {/* <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/projects"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            Projects
          </Button>
        </Box> */}
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
