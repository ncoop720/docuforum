import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import PublishIcon from '@material-ui/icons/Publish'
import SaveIcon from '@material-ui/icons/Save'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import PostSection from '../../../components/PostSection'
import PostSectionText from '../../../components/PostSectionText'

export default function editPost({ initialPost }) {
  const largeDevice = useMediaQuery('(min-width: 960px)')
  const midDevice = useMediaQuery('(min-width: 600px')
  const router = useRouter()
  const [navHighlight, setNavHighlight] = useState(0)
  const [post, setPost] = useState(initialPost)
  const editorShow = (largeDevice || navHighlight === 0) ? {} : { display: 'none' }
  const previewShow = (largeDevice || navHighlight === 1) ? {} : { display: 'none' }
  const subContainerStyle = { padding: '5px', width: largeDevice ? '50%' : '100%' }
  const editorSubContainerStyle = { ...subContainerStyle, ...editorShow, overflowY: 'scroll' }

  const containerStyle = {
    display: 'flex',
    height: containerHeight(),
    justifyContent: 'space-around'
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <TextField
            defaultValue={post.title}
            label="Title"
            onChange={e => updateTitle(e)}
            variant="filled"
          />
          <IconButton edge="end" onClick={() => addPostSection()}>
            <AddIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => savePost()}>
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={containerStyle}>
        <div id="editor-subcontainer" style={editorSubContainerStyle}>
          {post.sections.map(({ id, type }, sectionIndex) => {
            return (
              <PostSection key={id} movePostSection={movePostSection} sectionIndex={sectionIndex}>
                {
                  {
                    'text': (
                      <PostSectionText post={post} sectionIndex={sectionIndex} setPost={setPost} />
                    )
                  }[type]
                }
              </PostSection>
            )
          })}
        </div>
        <div id="preview-subcontainer" style={{ ...subContainerStyle, ...previewShow }} />
      </div>
      {!largeDevice && (
        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
          <BottomNavigation
              onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
              showLabels
              value={navHighlight}
          >
            <BottomNavigationAction icon={<EditIcon />} label="Edit" />
            <BottomNavigationAction icon={<PublishIcon />} label="Publish" />
          </BottomNavigation>
        </AppBar>
      )}
    </>
  )

  function addPostSection() {
    console.log('Adding post section')
  }

  function containerHeight() {
    if (largeDevice) return 'calc(100vh - 64px)'
    else if (midDevice && !largeDevice) return 'calc(100vh - 120px)'
    else return 'calc(100vh - 112px)'
  }

  function movePostSection(departureSectionIndex, direction) {
    console.log(`Moving post section (index ${departureSectionIndex}) ${direction}`)
  }

  function savePost() {
    console.log('Saving post')
  }

  function updateTitle(e) {
    const newPost = { ...post }
    newPost.title = e.target.value
    setPost(newPost)
  }
}

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query

  if (id === 'new') return { props: { initialPost: {
    sections: [{
        content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        id: 0,
        type: 'text'
    }],
    title: 'Untitled'
  }}}
}
