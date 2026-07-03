import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FloatingButton from '../components/FloatingButton/FloatingButton'
import CartToast from '../components/Cart/CartToast'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F1E2D1] text-[#6B4A3F] transition-colors duration-300">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <FloatingButton />
      <CartToast />
    </div>
  )
}

export default MainLayout
