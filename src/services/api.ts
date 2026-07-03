const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export const apiFetch = async <T>(path: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return (await response.json()) as T
}
