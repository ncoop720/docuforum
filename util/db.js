import { Pool } from 'pg'

if (!global.db) global.db = { pool: null }

if (!global.db.pool) {
  global.db.pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
    ssl: { rejectUnauthorized: false }
  })
}

export default db = global.db.pool
