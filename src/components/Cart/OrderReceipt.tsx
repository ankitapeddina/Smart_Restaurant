import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import type { CartItem } from '../../context/CartContext'

interface OrderReceiptProps {
  orderNumber: string
  orderDate: string
  customerName: string
  items: CartItem[]
  subtotal: number
  gstAmount: number
  reservationDiscount: number
  grandTotal: number
  paymentMethod: string
  onDownload: () => void
}

const OrderReceipt = ({ orderNumber, orderDate, customerName, items, subtotal, gstAmount, reservationDiscount, grandTotal, paymentMethod, onDownload }: OrderReceiptProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-[#F1E2D1] bg-white p-8 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">SmartTable</p>
        <h2 className="text-2xl font-semibold text-[#541A1A]">Receipt</h2>
      </div>
      <button type="button" onClick={onDownload} className="flex items-center gap-2 rounded-full bg-[#810B38] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#541A1A]">
        <Download size={16} /> Download PDF
      </button>
    </div>

    <div className="mt-6 grid gap-3 text-sm text-[#6E564D] md:grid-cols-2">
      <div><span className="font-semibold text-[#541A1A]">Customer</span><p>{customerName}</p></div>
      <div><span className="font-semibold text-[#541A1A]">Date</span><p>{orderDate}</p></div>
      <div><span className="font-semibold text-[#541A1A]">Order number</span><p>{orderNumber}</p></div>
      <div><span className="font-semibold text-[#541A1A]">Payment</span><p>{paymentMethod}</p></div>
    </div>

    <div className="mt-6 rounded-[20px] border border-[#F1E2D1] bg-[#FFF8F3] p-4">
      <h3 className="font-semibold text-[#541A1A]">Ordered items</h3>
      <div className="mt-3 space-y-2 text-sm text-[#6E564D]">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4"><span>{item.name} × {item.quantity}</span><span>₹{(item.priceValue * item.quantity).toFixed(0)}</span></div>
        ))}
      </div>
    </div>

    <div className="mt-6 space-y-2 text-sm text-[#6E564D]">
      <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
      <div className="flex justify-between"><span>GST</span><span>₹{gstAmount.toFixed(0)}</span></div>
      <div className="flex justify-between"><span>Reservation discount</span><span>-₹{reservationDiscount.toFixed(0)}</span></div>
      <div className="flex justify-between font-semibold text-[#541A1A]"><span>Grand total</span><span>₹{grandTotal.toFixed(0)}</span></div>
    </div>
  </motion.div>
)

export default OrderReceipt
