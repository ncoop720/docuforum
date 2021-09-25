import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import { useEffect, useState } from 'react'

export default function Posts({ AppAPI, IndexAPI }) {
  const { router } = AppAPI
  const { posts } = IndexAPI
  const [editPost, setEditPost] = useState(false)

  if (editPost) return <p>Edit Post Placeholder</p>
  else return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => router.push('/post/edit/new')}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        {posts ? (
          posts.map(post => {
            return <p key={post.id}>{post.id}</p>
          })
        ) : 'Loader Placeholder'}
      </div>
    </>
  )
}
