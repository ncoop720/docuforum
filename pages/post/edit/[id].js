import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function editPost({ session, loading }) {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!loading && !session) router.push('/api/auth/signin')
  }, [loading])

  return <div>edit post {id}</div>
}
