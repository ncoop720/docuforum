import { useRouter } from "next/router"
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import NoteIcon from '@material-ui/icons/Note'
import WebIcon from '@material-ui/icons/Web'
import PersonIcon from '@material-ui/icons/Person'

export default function BottomNav({ navHighlight, setNavHighlight }) {
  const router = useRouter()
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
        value={navHighlight}
        onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
        showLabels
      >
        <BottomNavigationAction label="Feed" icon={<WebIcon />} onClick={() => router.push('/feed')} />
        <BottomNavigationAction label="Posts" icon={<NoteIcon />} onClick={() => router.push('/posts')} />
        <BottomNavigationAction label="Users" icon={<PersonIcon />} onClick={() => router.push('/users')} />
      </BottomNavigation>
    </AppBar>
  )
}
