import { getSession } from 'next-auth/client'
import Nav from '../components/Nav'

export default function Users({ AppAPI }) {
  return (
    <Nav AppAPI={AppAPI}>
      <div>Users</div>
    </Nav>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) return { redirect: { destination: '/api/auth/signin' } }
  return { props: {} }
}
