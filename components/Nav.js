import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NoteIcon from '@material-ui/icons/Note'
import PersonIcon from '@material-ui/icons/Person'
import WebIcon from '@material-ui/icons/Web'
import { useState } from 'react'

const navIndex = {
  'feed': 0, 'post': 1, 'posts': 1, 'users': 2
}

export default function Nav({ AppAPI, children }) {
  const { largeDevice, router } = AppAPI
  const [navHighlight, setNavHighlight] = useState(navIndex[router.pathname.split('/')[1]])

  function containerOffset() {
    if (largeDevice) return '175px'
    else return '0px'
  }

  function handleListItemClick(_e, label, href) {
    setNavHighlight(label)
    router.push(href)
  }

  return (
    <>
      {largeDevice && (
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
      )}
      <div style={{ marginLeft: containerOffset() }}>
        {children}
      </div>
      {!largeDevice && (
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
          <BottomNavigation
            onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
            showLabels
            value={navHighlight}
          >
            <BottomNavigationAction icon={<WebIcon />} label="Feed" onClick={() => router.push('/feed')} />
            <BottomNavigationAction icon={<NoteIcon />} label="Posts" onClick={() => router.push('/posts')} />
            <BottomNavigationAction icon={<PersonIcon />} label="Users" onClick={() => router.push('/users')} />
          </BottomNavigation>
        </AppBar>
      )}
    </>
  )
}
