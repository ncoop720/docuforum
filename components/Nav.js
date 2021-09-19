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
import { useState, useEffect } from 'react'

export default function Nav({ AppAPI, children }) {
  const { largeDevice, router } = AppAPI
  const [page, setPage] = useState(null)

  useEffect(() => { setPage(parseInt(router.query.page) || 0) }, [router.query.page])

  return (
    <>
      {largeDevice && (
        <Drawer variant="persistent" anchor="left" open={true}>
          <ListItem button key="Feed" onClick={() => setPage(0)} selected={page === 0}>
            <ListItemIcon><WebIcon /></ListItemIcon>
            <ListItemText primary="Feed"/>
          </ListItem>
          <ListItem button key="Posts" onClick={() => setPage(1)} selected={page === 1}>
            <ListItemIcon><NoteIcon /></ListItemIcon>
            <ListItemText primary="Posts"/>
          </ListItem>
          <ListItem button key="Users" onClick={() => setPage(2)} selected={page === 2}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Users"/>
          </ListItem>
        </Drawer>
      )}
      <div style={{ marginLeft: containerOffset() }}>{children[page]}</div>
      {!largeDevice && (
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
          <BottomNavigation showLabels value={page}>
            <BottomNavigationAction icon={<WebIcon />} label="Feed" onClick={() => setPage(0)} />
            <BottomNavigationAction icon={<NoteIcon />} label="Posts" onClick={() =>setPage(1)} />
            <BottomNavigationAction icon={<PersonIcon />} label="Users" onClick={() => setPage(2)} />
          </BottomNavigation>
        </AppBar>
      )}
    </>
  )

  function containerOffset() { return largeDevice ? '175px' : '0px' }
}
