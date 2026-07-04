import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const adminApiClient = axios.create({
  baseURL: `${API_BASE}/admin`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

adminApiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('smart_restaurant_admin_token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const adminApi = {
  login: (payload: { email: string; password: string }) => adminApiClient.post('/login', payload),
  register: (payload: { full_name: string; email: string; password: string; confirm_password: string }) => adminApiClient.post('/register', payload),
  forgotPassword: (payload: { email: string }) => adminApiClient.post('/forgot-password', payload),
  profile: () => adminApiClient.get('/profile'),
  updateProfile: (payload: { full_name: string; email: string }) => adminApiClient.put('/profile', payload),
  changePassword: (payload: { current_password: string; new_password: string; confirm_password: string }) => adminApiClient.put('/change-password', payload),
  dashboard: () => adminApiClient.get('/dashboard'),
  reservations: () => adminApiClient.get('/reservations'),
  updateReservation: (id: number | string, payload: { status: string }) => adminApiClient.put(`/reservations/${id}`, payload),
  deleteReservation: (id: number | string) => adminApiClient.delete(`/reservations/${id}`),
  orders: () => adminApiClient.get('/orders'),
  updateOrder: (id: number | string, payload: { order_status: string }) => adminApiClient.put(`/orders/${id}`, payload),
  deleteOrder: (id: number | string) => adminApiClient.delete(`/orders/${id}`),
  customers: () => adminApiClient.get('/customers'),
  deleteCustomer: (id: number | string) => adminApiClient.delete(`/customers/${id}`),
  reports: () => adminApiClient.get('/reports'),
}

export default adminApi
