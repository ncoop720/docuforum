import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSession } from 'next-auth/client'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const [ session, loading ] = useSession()
  const largeDevice = useMediaQuery('(min-width:960px)')

  function containerOffset() {
    if (largeDevice) return '200px'
    else return '0px'
  }

  const containerStyle = {
    marginLeft: containerOffset(),
    padding: '0 20px'
  }

  return (
    <div style={containerStyle}>
      <Component {...pageProps} session={session} loading={loading} />
    </div>
  )
}
