import Feed from '../components/Feed'
import Nav from '../components/Nav'
import Posts from '../components/Posts'
import Users from '../components/Users'

export default function Index({ AppAPI }) {
  return (
    <Nav AppAPI={AppAPI}>
      <Feed />
      <Posts AppAPI={AppAPI} />
      <Users />
    </Nav>
  )
}
