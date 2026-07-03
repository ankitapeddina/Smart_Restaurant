const Footer = () => (
  <footer className="bg-[#541A1A] py-10 text-[#F1E2D1]">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-lg font-semibold text-[#F1E2D1]">SmartTable</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#DCC3AA]">
          Modern restaurant experience with elegant dining, fast reservation, and responsive service.
        </p>
      </div>
      <div className="space-y-2 text-sm text-[#DCC3AA]">
        <p className="transition hover:text-white">contact@smarttable.com</p>
        <p className="transition hover:text-white">+1 (555) 012-3456</p>
        <p className="transition hover:text-white">123 Culinary Avenue, Downtown</p>
      </div>
    </div>
  </footer>
)

export default Footer
