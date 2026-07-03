import type { Order } from '../types'
import { apiFetch } from './api'

export const fetchOrders = async (): Promise<Order[]> => {
  return apiFetch<Order[]>('/orders')
}

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  return apiFetch<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  })
}
