import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import WebIcon from '@material-ui/icons/Web'
import NoteIcon from '@material-ui/icons/Note'
import PersonIcon from '@material-ui/icons/Person'

export default function SideMenu() {
  return (
    <Drawer variant="persistent" anchor="left" open={true}>
      <ListItem button key="Profile">
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary="Profile"/>
      </ListItem>
      <ListItem button key="Feed">
        <ListItemIcon><WebIcon /></ListItemIcon>
        <ListItemText primary="Feed"/>
      </ListItem>
      <ListItem button key="Posts">
        <ListItemIcon><NoteIcon /></ListItemIcon>
        <ListItemText primary="Posts"/>
      </ListItem>
    </Drawer>
  )
}
