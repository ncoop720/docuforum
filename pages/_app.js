import { useSession } from 'next-auth/client'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [ session, loading ] = useSession()

  return <Component {...pageProps} session={session} loading={loading} />
}
