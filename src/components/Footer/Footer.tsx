const Footer = () => (
  <footer className="border-t border-slate-500/10 bg-slate-950/90 py-10 text-slate-400">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-lg font-semibold text-slate-100">SmartTable</p>
        <p className="mt-2 max-w-md text-sm leading-6">
          Modern restaurant experience with elegant dining, fast reservation, and responsive service.
        </p>
      </div>
      <div className="space-y-2 text-sm">
        <p>contact@smarttable.com</p>
        <p>+1 (555) 012-3456</p>
        <p>123 Culinary Avenue, Downtown</p>
      </div>
    </div>
  </footer>
)

export default Footer
