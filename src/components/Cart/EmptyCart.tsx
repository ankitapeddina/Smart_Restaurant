import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-[28px] border border-[#F1E2D1] bg-white p-10 text-center shadow-[0_18px_45px_rgba(84,26,26,0.08)]"
  >
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F1E2D1] text-[#810B38]">
      <ShoppingBag size={42} />
    </div>
    <h3 className="text-2xl font-semibold text-[#541A1A]">🛒 Your cart is empty</h3>
    <p className="mt-3 text-[#6E564D]">The finest dishes are waiting for you. Start with a signature course and build your order.</p>
    <Link to="/menu" className="mt-6 inline-flex rounded-full bg-[#810B38] px-6 py-3 font-semibold text-white transition hover:bg-[#541A1A]">
      Explore menu
    </Link>
  </motion.div>
)

export default EmptyCart
