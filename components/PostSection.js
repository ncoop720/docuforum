import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function PostSection({ children, movePostSection, sectionIndex }) {
  return (
    <Card style={{ padding: '5px' }}>
      <div>
        <div style={{ display: 'inline-block', lineHeight: '48px' }}>Text</div>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div>
        {children}
      </div>
    </Card>
  )
}
