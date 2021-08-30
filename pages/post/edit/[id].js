import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import PublishIcon from '@material-ui/icons/Publish'
import SaveIcon from '@material-ui/icons/Save'
import { convertToRaw, EditorState } from 'draft-js'
import { getSession } from 'next-auth/client'
import React from 'react'
import { useState } from 'react'
import PostSection from '../../../components/PostSection'
import PostSectionAdd from '../../../components/PostSectionAdd'
import PostSectionText from '../../../components/PostSectionText'

export default function PostEdit({ AppAPI, initialPost }) {
  const { midDevice, largeDevice, router } = AppAPI
  const [navHighlight, setNavHighlight] = useState(0)
  const [post, setPost] = useState(initialPost)
  const [newId, setNewId] = useState(Math.max(post.sections.map(s => s.id)) + 1)
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
            onChange={updateTitle}
            variant="filled"
          />
          <IconButton edge="end" onClick={() => savePost()}>
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={containerStyle}>
        <div id="editor-subcontainer" style={editorSubContainerStyle}>
          {post.sections.map(({ id, type }, sectionIndex) => {
            return (
              <React.Fragment key={id}>
                <PostSectionAdd
                  newId={newId}
                  post={post}
                  sectionIndex={sectionIndex}
                  setNewId={setNewId}
                  setPost={setPost}
                />
                <PostSection
                  post={post}
                  sectionIndex={sectionIndex}
                  sections={post.sections}
                  setPost={setPost}
                >
                  {
                    {
                      'text': (
                        <PostSectionText
                          post={post}
                          sectionIndex={sectionIndex}
                          setPost={setPost}
                        />
                      )
                    }[type]
                  }
                </PostSection>
              </React.Fragment>
            )
          })}
          <PostSectionAdd
            newId={newId}
            post={post}
            sectionIndex={post.sections.length}
            setNewId={setNewId}
            setPost={setPost}
          />
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

  function containerHeight() {
    if (largeDevice) return 'calc(100vh - 64px)'
    else if (midDevice) return 'calc(100vh - 120px)'
    else return 'calc(100vh - 112px)'
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
