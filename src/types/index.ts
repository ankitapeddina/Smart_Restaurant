export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  tag: string
  image?: string
  category?: string
  rating?: number
  availability?: boolean
  featured?: boolean
}

export interface Order {
  id: string
  items: Array<{ menuId: string; quantity: number }>
  total: number
  status: 'pending' | 'preparing' | 'served'
  createdAt: string
}

export interface DashboardData {
  totalOrders: number
  totalRevenue: number
  activeReservations: number
  averageRating: number
}

export interface User {
  id: number
  fullname: string
  email: string
  phone: string
  created_at?: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface UserRegister {
  fullname: string
  email: string
  phone: string
  password: string
}

export interface Reservation {
  id: string
  name: string
  guests: number
  date: string
  time: string
  phone: string
}

export interface ReservationItem {
  id: number
  name: string
  phone: string
  reservation_date: string
  reservation_time: string
  people_count: number
  special_request: string | null
  created_at: string
}
