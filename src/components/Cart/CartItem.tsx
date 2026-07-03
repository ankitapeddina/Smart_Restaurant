import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '../../context/CartContext'

interface CartItemProps {
  item: CartItemType
  onIncrease: (id: string) => void
  onDecrease: (id: string) => void
  onRemove: (id: string) => void
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }: CartItemProps) => {
  const subtotal = item.priceValue * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-[24px] border border-[#F1E2D1] bg-[#FFFDF9] p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src={item.image} alt={item.name} className="h-24 w-24 rounded-[18px] object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">{item.tag}</p>
            <h4 className="text-xl font-semibold text-[#541A1A]">{item.name}</h4>
            <p className="text-sm text-[#6E564D]">{item.category}</p>
            <p className="mt-2 font-semibold text-[#810B38]">{item.price}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <div className="flex items-center rounded-full border border-[#DCC3AA] bg-white">
            <button type="button" onClick={() => onDecrease(item.id)} className="rounded-full p-2 text-[#810B38] transition hover:bg-[#F1E2D1]">
              <Minus size={16} />
            </button>
            <span className="min-w-8 text-center font-semibold text-[#541A1A]">{item.quantity}</span>
            <button type="button" onClick={() => onIncrease(item.id)} className="rounded-full p-2 text-[#810B38] transition hover:bg-[#F1E2D1]">
              <Plus size={16} />
            </button>
          </div>
          <div className="min-w-[100px] text-right">
            <p className="text-sm text-[#6E564D]">Subtotal</p>
            <p className="font-semibold text-[#541A1A]">₹{subtotal.toFixed(0)}</p>
          </div>
          <button type="button" onClick={() => onRemove(item.id)} className="rounded-full bg-[#F1E2D1] p-3 text-[#810B38] transition hover:bg-[#DCC3AA]">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem
