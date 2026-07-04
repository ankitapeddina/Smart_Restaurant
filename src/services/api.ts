import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('smart_restaurant_token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = {
  register: (payload: { fullname: string; email: string; phone: string; password: string }) => api.post('/auth/register', payload),
  login: (payload: { email: string; password: string }) => api.post('/auth/login', payload),
  forgotPassword: (payload: { email: string }) => api.post('/auth/forgot-password', payload),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
}

export const reservationApi = {
  create: (payload: Record<string, unknown>) => api.post('/reservations', payload),
  list: () => api.get('/reservations'),
}

export const cartApi = {
  get: () => api.get('/cart'),
  add: (payload: { menu_item: string; quantity: number; price: number }) => api.post('/cart', payload),
  update: (id: number, payload: { quantity: number }) => api.put(`/cart/${id}`, payload),
  remove: (id: number) => api.delete(`/cart/${id}`),
  clear: () => api.delete('/cart'),
}

export const orderApi = {
  place: (payload: Record<string, unknown>) => api.post('/orders', payload),
  list: () => api.get('/orders'),
}

export const dashboardApi = {
  summary: () => api.get('/dashboard'),
}

export const apiFetch = async <T>(path: string, options: Record<string, unknown> = {}) => {
  const response = await api(path, options)
  return response.data as T
}

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong'
}

export default api
