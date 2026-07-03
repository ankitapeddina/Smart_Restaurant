import { Link } from 'react-router-dom'

const FloatingButton = () => (
  <div className="fixed bottom-6 right-6 z-50 hidden rounded-full border border-emerald-400/30 bg-slate-900/80 p-2 shadow-2xl shadow-slate-950/40 sm:block">
    <Link
      to="/reservation"
      className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400"
    >
      Reserve Now
    </Link>
  </div>
)

export default FloatingButton
