import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import EditIcon from '@material-ui/icons/Edit'
import PublishIcon from '@material-ui/icons/Publish'

export default function EditNav({ navHighlight, setNavHighlight }) {
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
          value={navHighlight}
          onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
          showLabels
      >
        <BottomNavigationAction label="Edit" icon={<EditIcon />} />
        <BottomNavigationAction label="Publish" icon={<PublishIcon />} />
      </BottomNavigation>
    </AppBar>
  )
}
