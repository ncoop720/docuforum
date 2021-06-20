import Modal from '@material-ui/core/Modal'

const NewPost = ({ closeNewPost, newPostOpen }) => {
  return (
    <Modal open={newPostOpen} onClose={() => closeNewPost()}>
      <p>placeholder</p>
    </Modal>
  )
}

export default NewPost
