import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js'
import { useState } from 'react'

export default function PostSectionText({ PostEditAPI, sectionIndex }) {
  const { post, setPost } = PostEditAPI
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(post.sections[sectionIndex].content))
  )

  return <Editor editorKey="editor" editorState={editorState} onChange={newContent => updateContent(newContent)} />

  function updateContent(newContent) {
    setEditorState(newContent)
    const newPost = { ...post }
    newPost.sections[sectionIndex].content = convertToRaw(newContent.getCurrentContent())
    setPost(newPost)
  }
}
