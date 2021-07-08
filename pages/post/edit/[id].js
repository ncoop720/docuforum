import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query
  if (id === 'new')
    return {
      props: {
        initialPost: [ convertToRaw(EditorState.createEmpty().getCurrentContent()) ]
      }
    }
}

export default function editPost({ initialPost }) {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(initialPost)
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
        edit post {id}
      </div>
    </>
  )
}
