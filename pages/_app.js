import '../styles/globals.css'
import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BottomNav from '../components/BottomNav'

export default function MyApp({ Component, pageProps }) {
  const largeDevice = useMediaQuery('(min-width:1280px)')

  return (
    <>
      <Container>
        <Component {...pageProps} />
      </Container>
      {!largeDevice && <BottomNav />}
    </>
  )
}
