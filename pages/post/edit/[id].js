import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SaveIcon from '@material-ui/icons/Save'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import EditNav from '../../../components/EditNav'
import PostSection from '../../../components/PostSection'
import TextPostSection from '../../../components/TextPostSection'

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
  const router = useRouter()
  const [title, setTitle] = useState(initialPost.title)
  const [sections, setSections] = useState(initialPost.sections)
  const [navHighlight, setNavHighlight] = useState(0)
  const largeDevice = useMediaQuery('(min-width:960px)')

  function subContainerWidth() {
    if (largeDevice) return '48%'
    else return '100%'
  }

  const containerStyle = {
    display: 'flex',
    height: 'calc(95vh - 64px)',
    justifyContent: 'space-around',
    paddingTop: '10px'
  }

  const subContainerStyle = { width: subContainerWidth() }
  const editorShow = (largeDevice || navHighlight === 0) ? {} : { display: 'none' }
  const previewShow = (largeDevice || navHighlight === 1) ? {} : { display: 'none' }

  function handleSave() {
    console.log('Saving Post')
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => handleSave()}>
            <SaveIcon />
          </IconButton>
          <TextField defaultValue={title} label="Title" variant="filled" />
        </Toolbar>
      </AppBar>
      <div style={containerStyle}>
        <div id="editor-container" style={{ ...subContainerStyle, ...editorShow}}>
          {sections.map(({ content, id, type }) => {
            return (
              <PostSection key={id}>
                {
                  {
                    'text': <TextPostSection content={content} />
                  }[type]
                }
              </PostSection>
            )
          })}
        </div>
        <div id="preview-container" style={{ ...subContainerStyle, ...previewShow }} />
      </div>
      {!largeDevice && <EditNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
