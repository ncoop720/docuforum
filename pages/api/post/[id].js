import db from '../../../util/db'

export default async function handler(req, res) {
  const { body, method, query } = req
  const { id } = query

  if (method === 'GET') {
    const data = await db.query('SELECT * FROM posts WHERE id = $1', [id])
    res.status(200).json({ post: data.rows[0] })
  }
  else if (method === 'PUT') {
    const { sections, title } = JSON.parse(body)

    await db.query(
      'UPDATE posts SET sections = $1, title = $2, updated_at = now() WHERE id = $3',
      [JSON.stringify(sections), title, id]
    )

    res.status(200)
  }

  res.end()
}
