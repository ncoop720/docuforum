import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

export default function Posts({ AppAPI }) {
  const { router } = AppAPI

  return (
    <div>
      <IconButton onClick={() => router.push('/post/edit/new')}>
        <AddIcon />
      </IconButton>
    </div>
  )
}
