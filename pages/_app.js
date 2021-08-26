import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const largeDevice = useMediaQuery('(min-width: 960px)')
  const midDevice = useMediaQuery('(min-width: 600px')
  const router = useRouter()
  const [ session, loading ] = useSession()

  return <Component {...pageProps} AppAPI={{ largeDevice, loading, midDevice, router, session }} />
}
