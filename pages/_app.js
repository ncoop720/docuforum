import '../styles/globals.css'
import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import BottomNav from '../components/BottomNav'

export default function MyApp({ Component, pageProps }) {
  const [navHighlight, setNavHighlight] = useState()
  const largeDevice = useMediaQuery('(min-width:1280px)')

  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
      {!largeDevice && <BottomNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
