import type { UserCredentials } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export const loginUser = async (credentials: UserCredentials) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}
