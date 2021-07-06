import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function editPost({ session, loading }) {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={() => router.back()}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>edit post {id}</div>
    </>
  )
}
