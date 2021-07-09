import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { useState } from 'react'

export default function TextPostSection({ content }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(content))
  )

  return <Editor editorKey="editor" editorState={editorState} onChange={setEditorState} />
}
