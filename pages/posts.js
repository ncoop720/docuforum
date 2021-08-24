import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Nav from '../components/Nav'

export default function Posts() {
  const router = useRouter()

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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  return { props: {} }
}
