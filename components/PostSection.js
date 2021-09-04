import Card from '@material-ui/core/Card'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import { useState } from 'react'

export default function PostSection({ children, PostEditAPI, sectionIndex }) {
  const { post, setPost } = PostEditAPI
  const { sections } = post
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Card style={{ padding: '5px' }}>
      <div>
        <div style={{ display: 'inline-block', lineHeight: '48px' }}><TextFieldsIcon /></div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)}><MoreVertIcon /></IconButton>
          <Menu anchorEl={anchorEl} keepMounted onClose={() => setAnchorEl(null)} open={Boolean(anchorEl)}>
            <MenuItem
              disabled={sections.length <= 1 || sectionIndex === 0}
              onClick={movePostSectionToTop}
            >
              Move to Top
            </MenuItem>
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
            <MenuItem
              disabled={sections.length <= 1 || sectionIndex === sections.length - 1}
              onClick={movePostSectionToBottom}
            >
              Move to Bottom
            </MenuItem>
            <MenuItem disabled={sections.length <= 1} onClick={deletePostSection}>
              Delete Section
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div>{children}</div>
    </Card>
  )

  function deletePostSection() {
    setAnchorEl(null)
    const newPost = { ...post }
    newPost.sections.splice(sectionIndex, 1)
    setPost(newPost)
  }

  function movePostSectionDown() {
    setAnchorEl(null)
    const newPost = { ...post }
    const tmp = newPost.sections[sectionIndex]
    newPost.sections[sectionIndex] = newPost.sections[sectionIndex + 1]
    newPost.sections[sectionIndex + 1] = tmp
    setPost(newPost)
  }

  function movePostSectionToBottom() {
    setAnchorEl(null)
    const newPost = { ...post }
    const sectionToMove = newPost.sections[sectionIndex]
    newPost.sections.splice(sectionIndex, 1)
    newPost.sections.push(sectionToMove)
    setPost(newPost)
  }

  function movePostSectionToTop() {
    setAnchorEl(null)
    const newPost = { ...post }
    const sectionToMove = newPost.sections[sectionIndex]
    newPost.sections.splice(sectionIndex, 1)
    newPost.sections.unshift(sectionToMove)
    setPost(newPost)
  }

  function movePostSectionUp() {
    setAnchorEl(null)
    const newPost = { ...post }
    const tmp = newPost.sections[sectionIndex]
    newPost.sections[sectionIndex] = newPost.sections[sectionIndex - 1]
    newPost.sections[sectionIndex - 1] = tmp
    setPost(newPost)
  }
}
