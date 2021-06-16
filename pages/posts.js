import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Posts({ session, loading }) {
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  return (
    <div>Posts</div>
  )
}
