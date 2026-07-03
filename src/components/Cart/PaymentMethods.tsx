import { motion } from 'framer-motion'
import { CreditCard, Landmark, Smartphone, Wallet2 } from 'lucide-react'

interface PaymentMethodsProps {
  paymentMethod: string
  onChange: (value: string) => void
  paymentDetails: Record<string, string>
  onDetailsChange: (field: string, value: string) => void
}

const paymentOptions = [
  { value: 'upi', label: 'UPI', icon: Smartphone },
  { value: 'card', label: 'Credit Card', icon: CreditCard },
  { value: 'netbanking', label: 'Net Banking', icon: Landmark },
  { value: 'cod', label: 'Cash on Delivery', icon: Wallet2 },
]

const PaymentMethods = ({ paymentMethod, onChange, paymentDetails, onDetailsChange }: PaymentMethodsProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-[0_18px_45px_rgba(84,26,26,0.08)]">
      <h3 className="text-xl font-semibold text-[#541A1A]">Payment methods</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {paymentOptions.map((option) => {
          const Icon = option.icon
          return (
            <label key={option.value} className={`flex cursor-pointer items-center gap-3 rounded-[18px] border px-4 py-3 transition ${paymentMethod === option.value ? 'border-[#810B38] bg-[#FFF8F3]' : 'border-[#F1E2D1] bg-white'}`}>
              <input type="radio" name="payment" checked={paymentMethod === option.value} onChange={() => onChange(option.value)} className="h-4 w-4 accent-[#810B38]" />
              <Icon size={18} className="text-[#810B38]" />
              <span className="font-medium text-[#541A1A]">{option.label}</span>
            </label>
          )
        })}
      </div>

      {paymentMethod === 'upi' && (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-[18px] border border-[#F1E2D1] bg-[#FFF8F3] px-4 py-3 text-sm text-[#541A1A]">Google Pay</div>
          <div className="rounded-[18px] border border-[#F1E2D1] bg-[#FFF8F3] px-4 py-3 text-sm text-[#541A1A]">PhonePe</div>
          <div className="rounded-[18px] border border-[#F1E2D1] bg-[#FFF8F3] px-4 py-3 text-sm text-[#541A1A]">Paytm</div>
          <div className="rounded-[18px] border border-[#F1E2D1] bg-[#FFF8F3] px-4 py-3 text-sm text-[#541A1A]">BHIM</div>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input value={paymentDetails.cardNumber || ''} onChange={(event) => onDetailsChange('cardNumber', event.target.value)} className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Card number" />
          <input value={paymentDetails.cardHolder || ''} onChange={(event) => onDetailsChange('cardHolder', event.target.value)} className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Card holder" />
          <input value={paymentDetails.expiry || ''} onChange={(event) => onDetailsChange('expiry', event.target.value)} className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="Expiry" />
          <input value={paymentDetails.cvv || ''} onChange={(event) => onDetailsChange('cvv', event.target.value)} className="rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]" placeholder="CVV" />
        </div>
      )}

      {paymentMethod === 'netbanking' && (
        <select value={paymentDetails.bank || ''} onChange={(event) => onDetailsChange('bank', event.target.value)} className="mt-5 w-full rounded-3xl border border-[#DCC3AA] bg-white px-4 py-3 text-[#541A1A]">
          <option value="">Select bank</option>
          <option value="SBI">SBI</option>
          <option value="HDFC">HDFC</option>
          <option value="ICICI">ICICI</option>
          <option value="Axis">Axis</option>
          <option value="Kotak">Kotak</option>
          <option value="PNB">PNB</option>
        </select>
      )}

      {paymentMethod === 'cod' && <p className="mt-5 rounded-[18px] border border-[#F1E2D1] bg-[#FFF8F3] px-4 py-3 text-sm text-[#541A1A]">Cash on delivery confirmed at the doorstep.</p>}
    </motion.div>
  )
}

export default PaymentMethods
