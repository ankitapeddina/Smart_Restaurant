import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles } from 'lucide-react'
import type { ReservationInfo } from '../../context/CartContext'

interface CartSummaryProps {
  subtotal: number
  gstAmount: number
  reservationDiscount: number
  deliveryCharge: number
  grandTotal: number
  reservation: ReservationInfo
  onReserveChange: (reservation: ReservationInfo) => void
}

const CartSummary = ({ subtotal, gstAmount, reservationDiscount, deliveryCharge, grandTotal, reservation, onReserveChange }: CartSummaryProps) => {
  return (
    <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-[#810B38]" />
        <h3 className="text-xl font-semibold text-[#541A1A]">Order summary</h3>
      </div>

      <div className="mt-6 space-y-3 text-sm text-[#6E564D]">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
        <div className="flex justify-between"><span>GST (5%)</span><span>₹{gstAmount.toFixed(0)}</span></div>
        <div className="flex justify-between text-[#810B38]"><span>Reservation discount</span><span>-₹{reservationDiscount.toFixed(0)}</span></div>
        <div className="flex justify-between"><span>Delivery charges</span><span>₹{deliveryCharge.toFixed(0)}</span></div>
        <div className="mt-4 border-t border-[#F1E2D1] pt-4 flex justify-between text-base font-semibold text-[#541A1A]"><span>Grand total</span><span>₹{grandTotal.toFixed(0)}</span></div>
      </div>

      <div className="mt-6 rounded-[20px] border border-[#F1E2D1] bg-[#FFF8F3] p-4">
        {reservation.isReserved ? (
          <div className="flex items-start gap-2 text-[#810B38]">
            <CheckCircle2 size={18} />
            <div>
              <p className="font-semibold">Reservation discount applied</p>
              <p className="text-sm">Table {reservation.tableNumber} is ready for your visit.</p>
            </div>
          </div>
        ) : (
          <div className="text-sm text-[#6E564D]">
            <p className="font-semibold text-[#541A1A]">Reserve a table to unlock 10% discount.</p>
            <button type="button" onClick={() => onReserveChange({ ...reservation, isReserved: true, tableNumber: '12', customerName: reservation.customerName || 'Guest', date: reservation.date || 'Today', time: reservation.time || '7:30 PM' })} className="mt-3 rounded-full bg-[#810B38] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#541A1A]">
              Reserve now
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  )
}

export default CartSummary
