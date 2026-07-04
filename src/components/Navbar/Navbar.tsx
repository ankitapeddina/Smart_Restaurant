import { useState } from 'react'
import { ShoppingCart, LogOut } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const publicNav = [
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
  ]

  const privateNav = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Menu', to: '/menu' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Reservation', to: '/reservation' },
    { label: 'My Reservations', to: '/my-reservations' },
    { label: 'Contact', to: '/contact' },
    { label: 'Cart', to: '/cart' },
    { label: user?.fullname ? `Profile (${user.fullname.split(' ')[0]})` : 'Profile', to: '/profile' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#DCC3AA]/50 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-[28px] font-[700] tracking-[0.5px] text-[#541A1A] font-display">
          <span className="text-[#541A1A]">Smart</span>
          <span className="text-[#810B38]">Table</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {(isAuthenticated ? privateNav : publicNav).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[16px] font-[500] font-sans transition ${
                  isActive ? 'text-[#810B38]' : 'text-[#6B4A3F] hover:bg-[#DCC3AA] hover:text-[#541A1A] rounded-full px-3 py-2'
                }`
              }
            >
              {item.label === 'Cart' ? (
                <span className="flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                </span>
              ) : (
                item.label
              )}
            </NavLink>
          ))}

          {isAuthenticated && (
            <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full border border-[#DCC3AA] bg-white px-4 py-2 text-[15px] font-[500] text-[#541A1A] transition hover:border-[#810B38] hover:text-[#810B38]">
              <LogOut size={16} /> Logout
            </button>
          )}

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
            {(isAuthenticated ? privateNav : publicNav).map((item) => (
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
                {item.label === 'Cart' ? (
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                  </span>
                ) : (
                  item.label
                )}
              </NavLink>
            ))}
            {isAuthenticated && (
              <button type="button" onClick={handleLogout} className="rounded-2xl border border-[#DCC3AA] bg-white px-4 py-3 text-left text-[#541A1A] transition hover:border-[#810B38] hover:text-[#810B38]">
                Logout
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
