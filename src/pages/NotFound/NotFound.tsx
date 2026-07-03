import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
    <div className="max-w-2xl rounded-[32px] border border-[#F1E2D1] bg-white p-12 shadow-2xl shadow-[rgba(84,26,26,0.08)]">
      <p className="text-sm uppercase tracking-[0.35em] text-[#810B38]">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-[#541A1A]">Page not found</h1>
      <p className="mt-6 text-[#6E564D]">The page you are looking for doesn’t exist or has been moved.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-[#810B38] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#541A1A]"
      >
        Return home
      </Link>
    </div>
  </div>
)

export default NotFound
