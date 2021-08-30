import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { convertToRaw, EditorState } from 'draft-js'
import { useState } from 'react'

const defaultSectionContent = {
  'text': convertToRaw(EditorState.createEmpty().getCurrentContent())
}

export default function PostSectionAdd({ newId, post, sectionIndex, setNewId, setPost }) {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => addPostSection('text')}>Add Text</MenuItem>
      </Menu>
    </div>
  )

  function addPostSection(type) {
    setAnchorEl(null)
    const newPost = { ...post }
    newPost.sections.splice(sectionIndex, 0, {
      content: defaultSectionContent[type],
      id: newId,
      type
    })
    setPost(newPost)
    setNewId(newId + 1)
  }
}
