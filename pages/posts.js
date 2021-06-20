import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Fab from '@material-ui/core/Fab'
import NewPost from '../components/post/NewPost'

const fabStyle = {
  bottom: 80,
  left:' 50%',
  position: 'fixed',
  transform: 'translateX(-50%)'
}

export default function Posts({ session, loading }) {
  const router = useRouter()
  const [newPostOpen, setNewPostOpen] = useState(false)

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  const closeNewPost = () => {
    setNewPostOpen(false)
  }

  return (
    <>
      <Fab
        aria-label="New Post"
        color="primary"
        onClick={() => setNewPostOpen(true)}
        style={fabStyle}
        variant="extended"
      >
        New Post
      </Fab>
      <NewPost closeNewPost={closeNewPost} newPostOpen={newPostOpen} />
    </>
  )
}
