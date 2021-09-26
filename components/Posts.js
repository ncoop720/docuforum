import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import AddIcon from '@material-ui/icons/Add'
import { useState } from 'react'
import PostPreview from './PostPreview'

export default function Posts({ AppAPI, IndexAPI }) {
  const { midDevice, largeDevice, router } = AppAPI
  const { posts } = IndexAPI
  const [editPost, setEditPost] = useState(false)

  const postsContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    height: containerHeight(),
    justifyContent: 'space-around', 
    overflowY: 'auto'
  }

  if (editPost) return <p>Edit Post Placeholder</p>
  else return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => router.push('/post/edit/new')}><AddIcon /></IconButton>
        </Toolbar>
      </AppBar>
      <div style={postsContainerStyle}>
        {posts ? posts.map(post => { return (
          <PostPreview AppAPI={AppAPI} key={post.id} postId={post.id}>
            {{
              'text': <p>{post.id}</p>
            }[post.sections[0].type]}
          </PostPreview>
        ) }) : 'Loader Placeholder'}
      </div>
    </>
  )

  function containerHeight() {
    if (largeDevice) return 'calc(100vh - 64px)'
    else if (midDevice) return 'calc(100vh - 120px)'
    else return 'calc(100vh - 112px)'
  }
}
