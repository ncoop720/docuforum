import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Nav from '../components/Nav'

export default function Posts({ session, loading }) {
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  return (
    <Nav>
      <div>
        <IconButton onClick={() => router.push('/post/edit/new')}>
          <AddIcon />
        </IconButton>
      </div>
    </Nav>
  )
}
