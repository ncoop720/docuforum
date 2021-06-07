import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import SideMenu from '../components/SideMenu'
import BottomNav from '../components/BottomNav'

const navIndex = {
  'feed': 0,
  'posts': 1,
  'users': 2
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [navHighlight, setNavHighlight] = useState(navIndex[router.pathname.split('/')[1]])
  const largeDevice = useMediaQuery('(min-width:1280px)')

  return (
    <>
      {largeDevice && <SideMenu navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
      <Container maxWidth="sm">
        <Component {...pageProps} />
      </Container>
      {!largeDevice && <BottomNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
