import db from '../../../util/db'

export default async function handler(req, res) {
  const { id } = req.query
  const data = await db.query('SELECT * FROM posts WHERE id = $1', [id])
  res.status(200).json({ post: data.rows[0] })
}
