import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => (
  <section className="relative overflow-hidden rounded-[32px] border border-[#F1E2D1] bg-[linear-gradient(135deg,_#FFF8F3,_#F1E2D1,_#DCC3AA)] p-8 shadow-2xl shadow-[rgba(84,26,26,0.08)] sm:p-12">
    <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[13px] uppercase tracking-[4px] text-[#810B38] font-[700] font-sans">Fine dining</span>
        <h1 className="mt-5 text-[38px] font-[700] leading-[1.1] text-[#541A1A] font-display sm:text-[52px] lg:text-[64px]">
          Elevate your restaurant experience with modern cuisine.
        </h1>
        <p className="mt-6 max-w-xl text-[#6E564D] text-[18px] leading-[1.8] sm:text-lg font-sans">
          Discover our elegant menu, book a table, and explore a polished dining journey built for taste and comfort.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/reservation" className="inline-flex items-center justify-center rounded-full bg-[#810B38] px-6 py-3 text-[16px] font-[600] tracking-[0.3px] font-sans text-white transition duration-300 hover:bg-[#541A1A] shadow-[0_10px_30px_rgba(129,11,56,0.25)]">
            Reserve Your Table
          </Link>
          <Link to="/menu" className="inline-flex items-center rounded-full border border-[#810B38] bg-white px-6 py-3 text-[16px] font-[600] tracking-[0.3px] font-sans text-[#810B38] transition duration-300 hover:bg-[#810B38] hover:text-white">
            View Menu
          </Link>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid gap-4"
      >
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-[13px] uppercase tracking-[4px] text-[#810B38] font-[700] font-sans">Featured</p>
          <h2 className="mt-4 text-[24px] font-[600] text-[#541A1A] font-display">Truffle Mushroom Pasta</h2>
          <p className="mt-3 text-[16px] text-[#6E564D] font-sans">Creamy pasta with premium truffle and parmesan for a memorable flavor.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-[13px] uppercase tracking-[4px] text-[#810B38] font-[700] font-sans">Chef's pick</p>
          <h2 className="mt-4 text-[24px] font-[600] text-[#541A1A] font-display">Charred Salmon Bowl</h2>
          <p className="mt-3 text-[16px] text-[#6E564D] font-sans">Fresh salmon, citrus glaze, and a crisp, balanced finish.</p>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Hero
