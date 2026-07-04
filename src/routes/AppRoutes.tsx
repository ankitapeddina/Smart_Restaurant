import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Menu from '../pages/Menu/Menu'
import Gallery from '../pages/Gallery/Gallery'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import Dashboard from '../pages/Dashboard/Dashboard'
import Orders from '../pages/Orders/Orders'
import Billing from '../pages/Billing/Billing'
import Reports from '../pages/Reports/Reports'
import Reservation from '../pages/Reservation/Reservation'
import MyReservations from '../pages/MyReservations/MyReservations'
import Settings from '../pages/Settings/Settings'
import CartPage from '../pages/Cart/Cart'
import Profile from '../pages/Profile/Profile'
import NotFound from '../pages/NotFound/NotFound'
import { useAuth } from '../context/AuthContext'

const RouteLoading = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#F1E2D1] px-6 text-center text-[#541A1A]">
    <div>
      <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#810B38]/60 border-t-transparent" />
      <p className="text-base font-semibold">Checking your session...</p>
    </div>
  </div>
)

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <RouteLoading />
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <RouteLoading />
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="menu" element={<Menu />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="billing" element={<Billing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="my-reservations" element={<MyReservations />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
