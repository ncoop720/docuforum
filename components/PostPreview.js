import Card from '@material-ui/core/Card'

export default function PostPreview({ AppAPI, children, postId }) {
  const { router } = AppAPI

  return (
    <Card
      onClick={() => router.push(`/post/edit/${postId}`)}
      style={{ cursor: 'pointer', margin: '5px', width: '300px' }}>
      {children}
    </Card>
  )
}
