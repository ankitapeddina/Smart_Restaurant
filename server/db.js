import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const DATABASE_FILE = './restaurant.db'

export const openDb = async () => {
  const db = await open({ filename: DATABASE_FILE, driver: sqlite3.Database })
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      items TEXT,
      total REAL,
      status TEXT,
      createdAt TEXT
    )
  `)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS dashboard (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `)
  const existing = await db.get('SELECT key FROM dashboard WHERE key = ?', 'meta')
  if (!existing) {
    await db.run('INSERT INTO dashboard (key, value) VALUES (?, ?)', 'meta', JSON.stringify({ totalOrders: 124, totalRevenue: 10800, activeReservations: 22, averageRating: 4.9 }))
  }
  return db
}
