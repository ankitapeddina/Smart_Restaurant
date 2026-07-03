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
        <span className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Fine dining</span>
        <h1 className="mt-5 text-4xl font-semibold text-[#541A1A] sm:text-5xl">
          Elevate your restaurant experience with modern cuisine.
        </h1>
        <p className="mt-6 max-w-xl text-[#6E564D] sm:text-lg">
          Discover our elegant menu, book a table, and explore a polished dining journey built for taste and comfort.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/reservation" className="inline-flex items-center justify-center rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A] shadow-[0_10px_30px_rgba(129,11,56,0.25)]">
            Reserve Your Table
          </Link>
          <Link to="/menu" className="inline-flex items-center rounded-full border border-[#810B38] bg-white px-6 py-3 text-sm font-semibold text-[#810B38] transition duration-300 hover:bg-[#810B38] hover:text-white">
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
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Featured</p>
          <h2 className="mt-4 text-2xl font-semibold text-[#541A1A]">Truffle Mushroom Pasta</h2>
          <p className="mt-3 text-[#6E564D]">Creamy pasta with premium truffle and parmesan for a memorable flavor.</p>
        </div>
        <div className="rounded-[28px] border border-[#F1E2D1] bg-white p-6 shadow-lg shadow-[rgba(84,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">Chef's pick</p>
          <h2 className="mt-4 text-2xl font-semibold text-[#541A1A]">Charred Salmon Bowl</h2>
          <p className="mt-3 text-[#6E564D]">Fresh salmon, citrus glaze, and a crisp, balanced finish.</p>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Hero
