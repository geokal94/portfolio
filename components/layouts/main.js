import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import NavBar from '../navbar'

const Main = ({ children, router }) => (
  <Box as="main" pb={12}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Giorgos Kallis — Senior Full-Stack Engineer, Athens." />
      <meta name="author" content="Giorgos Kallis" />
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      <meta property="og:site_name" content="Giorgos Kallis" />
      <meta name="og:title" content="Giorgos Kallis" />
      <meta property="og:type" content="website" />
      <title>Giorgos Kallis — Senior Full-Stack Engineer</title>
    </Head>

    <Box
      as="a"
      href="#hero-start"
      position="absolute"
      left="-9999px"
      top="auto"
      width="1px"
      height="1px"
      overflow="hidden"
      _focus={{
        left: '12px',
        top: '12px',
        width: 'auto',
        height: 'auto',
        p: 2,
        bg: 'accent',
        color: 'black',
        borderRadius: 'sm',
        zIndex: 100,
        fontSize: 'sm'
      }}
    >
      Skip to content
    </Box>

    <NavBar path={router.asPath} />

    <Container maxW="container.md" pt={24}>
      {children}
    </Container>
  </Box>
)

export default Main
