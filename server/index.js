import express from 'express'
import cors from 'cors'
import { openDb } from './db.js'
import { randomUUID } from 'crypto'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    return res.json({ success: true, token: 'demo-token' })
  }
  return res.status(400).json({ success: false, message: 'Missing credentials' })
})

app.get('/api/orders', async (req, res) => {
  const db = await openDb()
  const orders = await db.all('SELECT * FROM orders ORDER BY createdAt DESC')
  return res.json(orders)
})

app.post('/api/orders', async (req, res) => {
  const db = await openDb()
  const { items, total, status } = req.body
  const id = randomUUID()
  const createdAt = new Date().toISOString()
  await db.run('INSERT INTO orders (id, items, total, status, createdAt) VALUES (?, ?, ?, ?, ?)', id, JSON.stringify(items), total, status, createdAt)
  return res.json({ id, items, total, status, createdAt })
})

app.get('/api/dashboard', async (req, res) => {
  const db = await openDb()
  const row = await db.get('SELECT value FROM dashboard WHERE key = ?', 'meta')
  if (!row) {
    return res.status(404).json({ message: 'Dashboard data not found' })
  }
  return res.json(JSON.parse(row.value))
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
