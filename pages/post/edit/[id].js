import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { convertToRaw, EditorState } from 'draft-js'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import PostSection from '../../../components/PostSection'

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  const { id } = query

  if (id === 'new')
    return {
      props: {
        initialPostSections: [
          {
            content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
            id: 0,
            type: 'text'
          }
        ]
      }
    }
}

export default function editPost({ initialPostSections }) {
  const router = useRouter()
  const [postSections, setPostSections] = useState(initialPostSections)
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
        {postSections.map(({ content, id, type }) => {
          return (
            <PostSection
              content={content}
              key={id}
              type={type}
              setPostSections={setPostSections}
            />
          )
        })}
      </div>
    </>
  )
}
