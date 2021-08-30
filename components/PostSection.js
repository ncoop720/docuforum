import Card from '@material-ui/core/Card'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import { useState } from 'react'

export default function PostSection({ children, sectionIndex, sections }) {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Card style={{ marginBottom: '5px', padding: '5px' }}>
      <div>
        <div style={{ display: 'inline-block', lineHeight: '48px' }}>
          <TextFieldsIcon />
        </div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            onClose={() => setAnchorEl(null)}
            open={Boolean(anchorEl)}
          >
            <MenuItem
              disabled={sections.length <= 1 || sectionIndex === 0}
              onClick={movePostSectionUp}
            >
              Move Up
            </MenuItem>
            <MenuItem
              disabled={sections.length <= 1 || sectionIndex === sections.length - 1}
              onClick={movePostSectionDown}
            >
              Move Down
            </MenuItem>
            <MenuItem disabled={sections.length <= 1} onClick={deletePostSection}>
              Delete Section
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>
        {children}
      </div>
    </Card>
  )

  function deletePostSection() {
    console.log('Deleting post section')
    setAnchorEl(null)
  }

  function movePostSectionDown() {
    console.log('Adding post section down')
    setAnchorEl(null)
  }

  function movePostSectionUp() {
    console.log('Moving post section up')
    setAnchorEl(null)
  }
}
