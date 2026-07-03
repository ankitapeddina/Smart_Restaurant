export interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  tag: string
  image?: string
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

export interface UserCredentials {
  email: string
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
