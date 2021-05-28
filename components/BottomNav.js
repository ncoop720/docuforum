import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import NoteIcon from '@material-ui/icons/Note'
import WebIcon from '@material-ui/icons/Web'
import PersonIcon from '@material-ui/icons/Person'

export default function BottomNav() {
  return (
    <BottomNavigation
      showLabels
    >
      <BottomNavigationAction label="Posts" icon={<NoteIcon />} />
      <BottomNavigationAction label="Feed" icon={<WebIcon />} />
      <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
    </BottomNavigation>
  )
}
