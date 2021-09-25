import { getSession } from 'next-auth/client'
import db from '../../util/db'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (session) {
    const data = await db.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at', [session.id])
    res.status(200).json({ posts: data.rows })
  }
  else res.status(401).json({ posts: false })

  res.end()
}
