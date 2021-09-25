import Feed from '../components/Feed'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import Users from '../components/Users'
import { useEffect, useState } from 'react'
import apiURL from '../util/api-url'

export default function Index({ AppAPI }) {
  const { session } = AppAPI
  const [posts, setPosts] = useState(false)

  useEffect(async () => {
    if (session) {
      const res = await fetch(`${apiURL}/api/posts`)
      const { posts } = await res.json()
      setPosts(posts)
    }
  }, [session])

  return (
    <Nav AppAPI={AppAPI}>
      <Feed />
      <Posts AppAPI={AppAPI} IndexAPI={{ posts, setPosts }} />
      <Users />
    </Nav>
  )
}
