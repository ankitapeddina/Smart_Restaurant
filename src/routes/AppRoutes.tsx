import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Menu from '../pages/Menu/Menu'
import Gallery from '../pages/Gallery/Gallery'
import Contact from '../pages/Contact/Contact'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Orders from '../pages/Orders/Orders'
import Billing from '../pages/Billing/Billing'
import Reports from '../pages/Reports/Reports'
import Reservation from '../pages/Reservation/Reservation'
import Settings from '../pages/Settings/Settings'
import CartPage from '../pages/Cart/Cart'
import NotFound from '../pages/NotFound/NotFound'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
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
        <Route path="cart" element={<CartPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
