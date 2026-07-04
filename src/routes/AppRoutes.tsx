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
import AdminLayout from '../pages/Admin/AdminLayout'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminRegister from '../pages/Admin/AdminRegister'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import AdminReservations from '../pages/Admin/AdminReservations'
import AdminOrders from '../pages/Admin/AdminOrders'
import AdminCustomers from '../pages/Admin/AdminCustomers'
import AdminReports from '../pages/Admin/AdminReports'
import AdminForgotPassword from '../pages/Admin/AdminForgotPassword'
import AdminProfile from '../pages/Admin/AdminProfile'
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

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const adminToken = typeof window !== 'undefined' ? window.localStorage.getItem('smart_restaurant_admin_token') : null
  const adminRole = typeof window !== 'undefined' ? window.localStorage.getItem('smart_restaurant_admin_role') : null

  const normalizedRole = adminRole === 'super_admin' ? 'super_admin' : adminRole
  return adminToken && (normalizedRole === 'admin' || normalizedRole === 'super_admin') ? children : <Navigate to="/admin/login" replace />
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
      <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
      <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
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
