import { Link } from 'react-router-dom'

const FloatingButton = () => (
  <div className="fixed bottom-6 right-6 z-50 hidden rounded-full border border-[#DCC3AA]/30 bg-white/90 p-2 shadow-2xl shadow-[rgba(129,11,56,0.25)] sm:block">
    <Link
      to="/reservation"
      className="inline-flex items-center justify-center rounded-full bg-[#810B38] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(129,11,56,0.25)] transition hover:bg-[#541A1A]"
    >
      Reserve Now
    </Link>
  </div>
)

export default FloatingButton
