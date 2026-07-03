import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartItem from '../../components/Cart/CartItem'
import CartSummary from '../../components/Cart/CartSummary'
import EmptyCart from '../../components/Cart/EmptyCart'
import OrderReceipt from '../../components/Cart/OrderReceipt'
import PaymentMethods from '../../components/Cart/PaymentMethods'
import SectionHeader from '../../components/Common/SectionHeader'
import { useCart } from '../../context/CartContext'
import { calculateDiscount } from '../../utils/calculateDiscount'
import { calculateGST } from '../../utils/calculateGST'

const CartPage = () => {
  const navigate = useNavigate()
  const { items, subtotal, reservation, removeItem, updateQuantity, clearCart, setReservation } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({})
  const [customerName, setCustomerName] = useState('Ava')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'dinein'>('delivery')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const effectiveSubtotal = useMemo(() => subtotal, [subtotal])
  const effectiveGst = useMemo(() => calculateGST(effectiveSubtotal), [effectiveSubtotal])
  const effectiveDiscount = useMemo(() => calculateDiscount(effectiveSubtotal, reservation.isReserved), [effectiveSubtotal, reservation.isReserved])
  const effectiveGrandTotal = effectiveSubtotal + effectiveGst - effectiveDiscount + (effectiveSubtotal > 0 ? 50 : 0)

  const handleIncrease = (id: string) => {
    const item = items.find((entry) => entry.id === id)
    if (item) updateQuantity(id, item.quantity + 1)
  }

  const handleDecrease = (id: string) => {
    const item = items.find((entry) => entry.id === id)
    if (item) updateQuantity(id, item.quantity - 1)
  }

  const validateCheckout = () => {
    if (!items.length) return 'Please add items to your cart.'
    if (!paymentMethod) return 'Please select a payment method.'
    if (!customerName.trim()) return 'Please enter your name.'
    if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.cardHolder || !paymentDetails.expiry || !paymentDetails.cvv)) return 'Please complete your card details.'
    if (paymentMethod === 'netbanking' && !paymentDetails.bank) return 'Please choose a bank.'
    return ''
  }

  const handlePlaceOrder = () => {
    const validationError = validateCheckout()
    if (validationError) {
      alert(validationError)
      return
    }

    setIsPlacingOrder(true)
    window.setTimeout(() => {
      const generatedOrder = `ST-${Math.floor(100000 + Math.random() * 900000)}`
      setOrderNumber(generatedOrder)
      setOrderPlaced(true)
      setIsPlacingOrder(false)
      clearCart()
    }, 1400)
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('SmartTable Receipt', 20, 20)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Customer: ${customerName || 'Guest'}`, 20, 35)
    doc.text(`Order Number: ${orderNumber || 'ST-000000'}`, 20, 45)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55)
    doc.text(`Payment: ${paymentMethod}`, 20, 65)
    let y = 80
    items.forEach((item) => {
      doc.text(`${item.name} x${item.quantity}`, 20, y)
      doc.text(`₹${(item.priceValue * item.quantity).toFixed(0)}`, 160, y)
      y += 8
    })
    y += 8
    doc.text(`Subtotal: ₹${effectiveSubtotal.toFixed(0)}`, 20, y)
    doc.text(`GST: ₹${effectiveGst.toFixed(0)}`, 20, y + 8)
    doc.text(`Discount: -₹${effectiveDiscount.toFixed(0)}`, 20, y + 16)
    doc.text(`Grand Total: ₹${effectiveGrandTotal.toFixed(0)}`, 20, y + 24)
    doc.save(`receipt-${orderNumber || 'smarttable'}.pdf`)
  }

  return (
    <div className="space-y-8">
      <SectionHeader title="Cart" subtitle="Elegant checkout" />

      {orderPlaced ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-[#F1E2D1] bg-white p-8 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }} className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F1E2D1] text-[#810B38]">
              <CheckCircle2 size={54} />
            </motion.div>
            <h2 className="text-3xl font-semibold text-[#541A1A]">🎉 Order placed successfully</h2>
            <p className="mt-3 text-[#6E564D]">Your order number is <span className="font-semibold text-[#810B38]">{orderNumber}</span>.</p>
            <p className="mt-2 text-[#6E564D]">Estimated time: 30-40 mins</p>
            {reservation.isReserved && <p className="mt-2 text-[#810B38]">Reservation table {reservation.tableNumber}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => navigate('/menu')} className="rounded-full bg-[#810B38] px-6 py-3 font-semibold text-white transition hover:bg-[#541A1A]">Continue shopping</button>
              <button type="button" onClick={() => navigate('/orders')} className="rounded-full border border-[#DCC3AA] px-6 py-3 font-semibold text-[#541A1A]">Track order</button>
              <button type="button" onClick={handleDownload} className="rounded-full border border-[#DCC3AA] px-6 py-3 font-semibold text-[#541A1A]">Download receipt</button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            {items.length === 0 ? <EmptyCart /> : (
              <>
                <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#541A1A]">Your order</h3>
                    <span className="rounded-full bg-[#F1E2D1] px-3 py-1 text-sm font-semibold text-[#810B38]">{items.length} dishes</span>
                  </div>
                  <AnimatePresence mode="popLayout">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <CartItem key={item.id} item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} onRemove={removeItem} />
                      ))}
                    </div>
                  </AnimatePresence>
                </div>

                <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
                  <h3 className="text-xl font-semibold text-[#541A1A]">Delivery details</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Customer name" />
                    <div className="flex rounded-3xl border border-[#DCC3AA] bg-[#FFF8F3] p-1">
                      <button type="button" onClick={() => setDeliveryMode('delivery')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${deliveryMode === 'delivery' ? 'bg-[#810B38] text-white' : 'text-[#541A1A]'}`}>Delivery</button>
                      <button type="button" onClick={() => setDeliveryMode('dinein')} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold ${deliveryMode === 'dinein' ? 'bg-[#810B38] text-white' : 'text-[#541A1A]'}`}>Dine-in</button>
                    </div>
                    <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Coupon code" value={couponCode} onChange={(event) => setCouponCode(event.target.value)} />
                    <input className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Estimated prep time" value="25-35 mins" readOnly />
                  </div>
                  <textarea value={specialInstructions} onChange={(event) => setSpecialInstructions(event.target.value)} className="mt-4 min-h-[110px] w-full rounded-[24px] border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Special instructions" />
                </div>

                <PaymentMethods paymentMethod={paymentMethod} onChange={setPaymentMethod} paymentDetails={paymentDetails} onDetailsChange={(field, value) => setPaymentDetails((current) => ({ ...current, [field]: value }))} />
              </>
            )}
          </div>

          <div className="space-y-6">
            <CartSummary subtotal={effectiveSubtotal} gstAmount={effectiveGst} reservationDiscount={effectiveDiscount} deliveryCharge={effectiveSubtotal > 0 ? 50 : 0} grandTotal={effectiveGrandTotal} reservation={reservation} onReserveChange={setReservation} />

            <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
              <h3 className="text-xl font-semibold text-[#541A1A]">Live total updates</h3>
              <div className="mt-4 space-y-2 text-sm text-[#6E564D]">
                <div className="flex justify-between"><span>Items</span><span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryMode === 'delivery' ? 'Express' : 'Dining room'}</span></div>
                <div className="flex justify-between font-semibold text-[#541A1A]"><span>Current total</span><span>₹{effectiveGrandTotal.toFixed(0)}</span></div>
              </div>
            </div>

            {items.length > 0 && (
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }} onClick={handlePlaceOrder} disabled={isPlacingOrder} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#810B38] px-6 py-4 font-semibold text-white transition hover:bg-[#541A1A] disabled:cursor-not-allowed disabled:opacity-70">
                {isPlacingOrder ? <><Loader2 className="animate-spin" size={18} /> Processing order...</> : 'Place order'}
              </motion.button>
            )}
          </div>
        </div>
      )}

      {items.length > 0 && !orderPlaced && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-[#F1E2D1] bg-[#FFF8F3] p-6">
          <h3 className="text-lg font-semibold text-[#541A1A]">Order timeline</h3>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6E564D]">
            <span className="rounded-full bg-white px-3 py-2">Order received</span>
            <span className="rounded-full bg-white px-3 py-2">Kitchen prep</span>
            <span className="rounded-full bg-white px-3 py-2">Packing</span>
            <span className="rounded-full bg-white px-3 py-2">Out for delivery</span>
          </div>
        </motion.div>
      )}

      {items.length > 0 && !orderPlaced && (
        <OrderReceipt orderNumber={orderNumber || 'ST-000000'} orderDate={new Date().toLocaleDateString()} customerName={customerName || 'Guest'} items={items} subtotal={effectiveSubtotal} gstAmount={effectiveGst} reservationDiscount={effectiveDiscount} grandTotal={effectiveGrandTotal} paymentMethod={paymentMethod} onDownload={handleDownload} />
      )}
    </div>
  )
}

export default CartPage
