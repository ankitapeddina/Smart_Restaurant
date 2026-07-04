import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { MenuItem } from '../types'

export interface CartItem extends MenuItem {
  quantity: number
  priceValue: number
}

export interface ReservationInfo {
  isReserved: boolean
  customerName: string
  tableNumber: string
  date: string
  time: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  gstAmount: number
  reservationDiscount: number
  deliveryCharge: number
  grandTotal: number
  reservation: ReservationInfo
  toastMessage: string | null
  addToCart: (item: MenuItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  setReservation: (reservation: ReservationInfo) => void
  showToast: (message: string) => void
  clearToast: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const CART_STORAGE_KEY = 'smarttable-cart'
const RESERVATION_STORAGE_KEY = 'smarttable-reservation'

const parsePrice = (price: string) => Number(String(price).replace(/[^\d.]/g, '')) || 0

const toCartItem = (item: MenuItem, quantity = 1): CartItem => ({
  ...item,
  quantity,
  priceValue: parsePrice(item.price),
})

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [reservation, setReservationState] = useState<ReservationInfo>(() => {
    if (typeof window === 'undefined') return { isReserved: false, customerName: '', tableNumber: '', date: '', time: '' }
    try {
      const saved = window.localStorage.getItem(RESERVATION_STORAGE_KEY)
      return saved ? JSON.parse(saved) : { isReserved: false, customerName: '', tableNumber: '', date: '', time: '' }
    } catch {
      return { isReserved: false, customerName: '', tableNumber: '', date: '', time: '' }
    }
  })

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    window.localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservation))
  }, [reservation])

  useEffect(() => {
    if (!toastMessage) return undefined
    const timeout = window.setTimeout(() => setToastMessage(null), 2200)
    return () => window.clearTimeout(timeout)
  }, [toastMessage])

  const addToCart = (item: MenuItem) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id)
      if (existing) {
        return current.map((entry) => (entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))
      }
      return [...current, toCartItem(item)]
    })
    setToastMessage(`✅ ${item.name} added to cart`)
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((entry) => entry.id !== id)
      }
      return current.map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
    })
  }

  const removeItem = (id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const setReservation = (nextReservation: ReservationInfo) => {
    setReservationState(nextReservation)
  }

  const showToast = (message: string) => setToastMessage(message)
  const clearToast = () => setToastMessage(null)

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0), [items])
  const gstAmount = subtotal * 0.05
  const reservationDiscount = reservation.isReserved ? Math.min(subtotal * 0.1, 500) : 0
  const deliveryCharge = subtotal > 0 ? 50 : 0
  const grandTotal = subtotal + gstAmount - reservationDiscount + deliveryCharge

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      gstAmount,
      reservationDiscount,
      deliveryCharge,
      grandTotal,
      reservation,
      toastMessage,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      setReservation,
      showToast,
      clearToast,
    }),
    [items, itemCount, subtotal, gstAmount, reservationDiscount, deliveryCharge, grandTotal, reservation, toastMessage],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}
