import { useRouter } from "next/router"
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import WebIcon from '@material-ui/icons/Web'
import NoteIcon from '@material-ui/icons/Note'
import PersonIcon from '@material-ui/icons/Person'

export default function SideMenu({ navHighlight, setNavHighlight }) {
  const router = useRouter()

  const handleListItemClick = (_e, label, href) => {
    setNavHighlight(label)
    router.push(href)
  }

  return (
    <Drawer variant="persistent" anchor="left" open={true}>
      <ListItem
        button
        key="Feed"
        onClick={e => handleListItemClick(e, 0, '/feed')}
        selected={navHighlight === 0}
      >
        <ListItemIcon><WebIcon /></ListItemIcon>
        <ListItemText primary="Feed"/>
      </ListItem>
      <ListItem
        button
        key="Posts"
        onClick={e => handleListItemClick(e, 1, '/posts')}
        selected={navHighlight === 1}
      >
        <ListItemIcon><NoteIcon /></ListItemIcon>
        <ListItemText primary="Posts"/>
      </ListItem>
      <ListItem
        button
        key="Users"
        onClick={e => handleListItemClick(e, 2, '/users')}
        selected={navHighlight === 2}
      >
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary="Users"/>
      </ListItem>
    </Drawer>
  )
}
