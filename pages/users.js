import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Nav from '../components/Nav'

export default function Users({ session, loading }) {
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  return (
    <Nav>
      <div>Users</div>
    </Nav>
  )
}
