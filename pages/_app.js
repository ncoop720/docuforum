import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import SideMenu from '../components/SideMenu'
import '../styles/globals.css'

const navIndex = {
  'feed': 0,
  'post': 1,
  'posts': 1,
  'users': 2
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [ session, loading ] = useSession()
  const [navHighlight, setNavHighlight] = useState(navIndex[router.pathname.split('/')[1]])
  const largeDevice = useMediaQuery('(min-width:960px)')

  function containerOffset() {
    if (largeDevice)
      return '200px'
    else
      return '0px'
  }

  const containerStyle = {
    marginLeft: containerOffset()
  }

  return (
    <>
      {largeDevice && <SideMenu navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
      <div style={containerStyle}>
        <Component {...pageProps} session={session} loading={loading} />
      </div>
      {!largeDevice && <BottomNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
