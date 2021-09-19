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
import _ from 'lodash'
import { getSession } from 'next-auth/client'
import { Fragment, useEffect, useState } from 'react'
import PostSection from '../../../components/PostSection'
import PostSectionAdd from '../../../components/PostSectionAdd'
import PostSectionText from '../../../components/PostSectionText'
import apiURL from '../../../util/api-url'

export default function PostEdit({ AppAPI, initialPost }) {
  const { midDevice, largeDevice, router } = AppAPI
  const [navHighlight, setNavHighlight] = useState(0)
  const [initialPostCopy, setInitialPostCopy] = useState(initialPost)
  const [post, setPost] = useState(_.cloneDeep(initialPost))
  const { id, sections, title } = post
  const maxPostSectionId = Math.max(...sections.map(s => s.id))
  const [newId, setNewId] = useState(maxPostSectionId + 1)
  const PostEditAPI = { newId, post, setNewId, setPost }
  const subContainerStyle = { padding: '5px', width: largeDevice ? '50%' : '100%' }
  const editorStyle = { display: (largeDevice || navHighlight === 0) ? 'block' : 'none', overflowY: 'auto' }
  const previewStyle = { display: (largeDevice || navHighlight === 1) ? 'block' : 'none' }
  const postChanged = !_.isEqual(initialPostCopy, post)

  useEffect(() => {
    const sectionToFocus = sections.filter(section => section.id === maxPostSectionId)[0]
    if (sectionToFocus.type === 'text')
      document.getElementsByClassName('public-DraftEditor-content')[sections.indexOf(sectionToFocus)].focus()
  }, [sections.length])

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.push({ pathname: '/', query: { page: '1' } })}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <TextField
            defaultValue={title}
            label="Title"
            onChange={e => setPost({ ...post, title: e.target.value })}
            variant="filled" />
          <IconButton edge="end" onClick={() => savePost()}>
            <SaveIcon className={postChanged ? 'save-red' : ''} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ display: 'flex', height: containerHeight(), justifyContent: 'space-around' }}>
        <div style={{ ...editorStyle, ...subContainerStyle }}>
          {sections.map(({ id, type }, sectionIndex) => { return (
            <Fragment key={id}>
              <PostSectionAdd PostEditAPI={PostEditAPI} sectionIndex={sectionIndex} />
              <PostSection PostEditAPI={PostEditAPI} sectionIndex={sectionIndex}>
                {{
                  'text': <PostSectionText PostEditAPI={PostEditAPI} sectionIndex={sectionIndex} />
                }[type]}
              </PostSection>
            </Fragment>
          )})}
          <PostSectionAdd PostEditAPI={PostEditAPI} sectionIndex={sections.length} />
        </div>
        <div style={{ ...previewStyle, ...subContainerStyle }} />
      </div>
      {!largeDevice && (
        <AppBar position="fixed" style={{ bottom: 0, top: 'auto' }}>
          <BottomNavigation
            onChange={(_e, newNavHighlight) => setNavHighlight(newNavHighlight)}
            showLabels
            value={navHighlight}>
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

  async function savePost() {
    await fetch(`${apiURL}/api/post/${id}`, { body: JSON.stringify(post), method: 'PUT' })
    setInitialPostCopy(_.cloneDeep(post))
  }
}

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query

  if (id === 'new') {
    const res = await fetch(`${apiURL}/api/post/create`, { headers: { cookie: req.headers.cookie } })
    const { post } = await res.json()
    return { redirect: { destination: `/post/edit/${post.id}` } }
  } else {
    const res = await fetch(`${apiURL}/api/post/${id}`)
    const { post } = await res.json()
    return post && post.user_id === session.id ? { props: { initialPost: post } } : { notFound: true }
  }
}
