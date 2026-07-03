import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => (
  <section className="relative overflow-hidden rounded-[32px] border border-slate-500/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-12">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_35%)]" />
    <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-sm uppercase tracking-[0.35em] text-emerald-400">Fine dining</span>
        <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
          Elevate your restaurant experience with modern cuisine.
        </h1>
        <p className="mt-6 max-w-xl text-slate-300 sm:text-lg">
          Discover our elegant menu, book a table, and explore a polished dining journey built for taste and comfort.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/reservation" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Reserve Your Table
          </Link>
          <Link to="/menu" className="inline-flex items-center rounded-full border border-slate-500/20 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:bg-slate-800/80">
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
        <div className="rounded-[28px] bg-slate-950/70 p-6 shadow-xl shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Featured</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Truffle Mushroom Pasta</h2>
          <p className="mt-3 text-slate-300">Creamy pasta with premium truffle and parmesan for a memorable flavor.</p>
        </div>
        <div className="rounded-[28px] bg-slate-950/70 p-6 shadow-xl shadow-slate-950/30">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Chef's pick</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">Charred Salmon Bowl</h2>
          <p className="mt-3 text-slate-300">Fresh salmon, citrus glaze, and a crisp, balanced finish.</p>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Hero
