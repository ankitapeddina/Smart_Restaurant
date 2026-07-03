import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const CartToast = () => {
  const { toastMessage, clearToast } = useCart()

  return (
    <AnimatePresence>
      {toastMessage ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onClick={clearToast} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[#F1E2D1] bg-[#541A1A] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(84,26,26,0.25)]">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default CartToast
