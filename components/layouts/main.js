import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Giorgos's homepage" />
        <meta name="author" content="Giorgos Kallis" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta property="og:site_name" content="Giorgos Kallis" />
        <meta name="og:title" content="Giorgos Kallis" />
        <meta property="og:type" content="website" />
        <title>Giorgos Kallis - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={20}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
