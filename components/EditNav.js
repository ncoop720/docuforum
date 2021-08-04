import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

export default function EditNav({ navHighlight, setNavHighlight }) {
  return (
    <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation
          value={navHighlight}
          onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
          showLabels
      >
        <BottomNavigationAction label="Edit" icon={<div />} />
        <BottomNavigationAction label="Preview" icon={<div />} />
      </BottomNavigation>
    </AppBar>
  )
}
