import { convertToRaw, EditorState } from 'draft-js'
import { getSession } from 'next-auth/client'
import db from '../../../util/db'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (session) {
    const defaultSections = JSON.stringify([{
      content: convertToRaw(EditorState.createEmpty().getCurrentContent()), id: 0, type: 'text'
    }])

    const data = await db.query(
      'INSERT INTO posts (user_id, title, sections) VALUES ($1, $2, $3) RETURNING id',
      [session.id, 'Untitled', defaultSections]
    )

    res.status(200).json({ post: data.rows[0] })
  }
  else res.status(401).json({ post: false })

  res.end()
}
