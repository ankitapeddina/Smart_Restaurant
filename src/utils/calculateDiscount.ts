export const calculateDiscount = (subtotal: number, isReserved: boolean, maxDiscount = 500) => {
  if (!isReserved) return 0
  return Math.min(subtotal * 0.1, maxDiscount)
}
