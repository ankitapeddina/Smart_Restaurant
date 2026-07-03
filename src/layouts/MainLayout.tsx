import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import FloatingButton from '../components/FloatingButton/FloatingButton'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  )
}

export default MainLayout
