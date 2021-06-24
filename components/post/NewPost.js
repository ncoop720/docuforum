import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

const containerStyle = {
  backgroundColor: 'white',
  marginTop: '20px',
  padding: '10px'
}

const NewPost = ({ closeNewPost, newPostOpen }) => {
  return (
    <Modal open={newPostOpen} onClose={() => closeNewPost()}>
      <Container style={containerStyle} maxWidth="sm">
        <Editor />
      </Container>
    </Modal>
  )
}

export default NewPost
