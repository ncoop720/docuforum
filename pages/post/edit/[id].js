import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import Editor from '@monaco-editor/react'

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query
  if (id === 'new') return { props: { initialCode: '' } }
}

export default function editPost({ initialCode }) {
  const router = useRouter()
  const [code, setCode] = useState(initialCode)
  const containerStyle = { padding: '10px' }

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
        <Editor
          defaultLanguage="html"
          defaultValue={code}
          height='calc(95vh - 64px)'
          onChange={newCode => setCode(newCode)}
        />
      </div>
    </>
  )
}
