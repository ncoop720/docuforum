import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Editor from '@monaco-editor/react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import EditNav from '../../../components/EditNav'

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query
  if (id === 'new') return { props: { initialCode: '' } }
}

export default function editPost({ initialCode }) {
  const router = useRouter()
  const [code, setCode] = useState(initialCode)
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

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={containerStyle}>
        <div id="editor-container" style={{ ...subContainerStyle, ...editorShow}}>
          <Editor
            defaultLanguage="html"
            defaultValue={code}
            height='100%'
            onChange={newCode => setCode(newCode)}
            options={{
              minimap: {
                enabled: false
              },
              tabSize: 2,
              wordWrap: 'bounded'
            }}
          />
        </div>
        <div id="preview-container" style={{ ...subContainerStyle, ...previewShow }} >
          <iframe srcDoc={code} style={{ border: '0px', height: '100%', width: '100%' }} />
        </div>
      </div>
      {!largeDevice && <EditNav navHighlight={navHighlight} setNavHighlight={setNavHighlight} />}
    </>
  )
}
