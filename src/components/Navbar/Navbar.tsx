import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reservation', to: '/reservation' },
  { label: 'Contact', to: '/contact' },
  { label: 'Login', to: '/login' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#DCC3AA]/50 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
<Link
        to="/"
        className="text-[28px] font-[700] tracking-[0.5px] text-[#541A1A] font-display"
      >
          <span className="text-[#541A1A]">Smart</span>
          <span className="text-[#810B38]">Table</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[16px] font-[500] font-sans transition ${
                  isActive ? 'text-[#810B38]' : 'text-[#6B4A3F] hover:bg-[#DCC3AA] hover:text-[#541A1A] rounded-full px-3 py-2'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#DCC3AA] bg-white text-[#541A1A] transition hover:border-[#810B38] md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#DCC3AA]/50 bg-white/95 pb-6 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-[16px] font-[500] font-sans transition ${
                    isActive ? 'bg-[#DCC3AA] text-[#810B38]' : 'text-[#6B4A3F] hover:bg-[#DCC3AA] hover:text-[#541A1A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
