import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddIcon from '@material-ui/icons/Add'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SaveIcon from '@material-ui/icons/Save'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import EditNav from '../../../components/EditNav'
import PostEditor from '../../../components/PostEditor'

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query

  if (id === 'new')
    return {
      props: {
        initialPost: {
          sections: [
            {
              content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
              id: 0,
              type: 'text'
            }
          ],
          title: 'Untitled'
        }
      }
    }
}

export default function editPost({ initialPost }) {
  const largeDevice = useMediaQuery('(min-width: 960px)')
  const midDevice = useMediaQuery('(min-width: 600px')
  const router = useRouter()
  const [navHighlight, setNavHighlight] = useState(0)
  const [post, setPost] = useState(initialPost)

  function containerHeight() {
    if (largeDevice) return 'calc(100vh - 64px)'
    else if (midDevice && !largeDevice) return 'calc(100vh - 120px)'
    else return 'calc(100vh - 112px)'
  }

  const containerStyle = {
    display: 'flex',
    height: containerHeight(),
    justifyContent: 'space-around'
  }

  const editorShow = (largeDevice || navHighlight === 0) ? {} : { display: 'none' }
  const previewShow = (largeDevice || navHighlight === 1) ? {} : { display: 'none' }
  const subContainerStyle = { width: largeDevice ? '50%' : '100%' }

  function handleAddSection() {
    console.log('Adding section')
  }

  function handleMoveSection(departureSectionIndex, direction) {
    console.log(`Moving section ${departureSectionIndex} ${direction}`)
  }

  function handleSavePost() {
    console.log('Saving post')
  }

  function handleTitleChange(e) {
    const newPost = { ...post }
    newPost.title = e.target.value
    setPost(newPost)
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <TextField defaultValue={post.title} label="Title" onChange={e => handleTitleChange(e)} variant="filled" />
          <IconButton edge="end" onClick={() => handleAddSection()}>
            <AddIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => handleSavePost()}>
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={containerStyle}>
        <div id="editor-subcontainer" style={{ ...subContainerStyle, ...editorShow}}>
          <PostEditor pageAPI={{ handleMoveSection, setPost }} post={post} />
        </div>
        <div id="preview-subcontainer" style={{ ...subContainerStyle, ...previewShow }} />
      </div>
      {!largeDevice && <EditNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
