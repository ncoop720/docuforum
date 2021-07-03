import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import SideMenu from '../components/SideMenu'

const navIndex = {
  'feed': 0, 'post': 1, 'posts': 1, 'users': 2
}

export default function Nav({ children }) {
  const router = useRouter()
  const [navHighlight, setNavHighlight] = useState(navIndex[router.pathname.split('/')[1]])
  const largeDevice = useMediaQuery('(min-width:960px)')

  return (
    <>
      {largeDevice && <SideMenu navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
      {children}
      {!largeDevice && <BottomNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
