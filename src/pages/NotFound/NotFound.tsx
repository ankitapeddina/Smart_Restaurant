import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
    <div className="max-w-2xl rounded-[32px] border border-slate-500/10 bg-slate-950/80 p-12 shadow-2xl shadow-slate-950/20">
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Page not found</h1>
      <p className="mt-6 text-slate-300">The page you are looking for doesn’t exist or has been moved.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
        Return home
      </Link>
    </div>
  </div>
)

export default NotFound
