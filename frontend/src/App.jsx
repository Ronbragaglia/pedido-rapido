import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'
import Cart from './pages/Cart'
import OrderTracking from './pages/OrderTracking'
import OrderHistory from './pages/OrderHistory'
import Login from './pages/Login'
import RestaurantDashboard from './pages/dashboard/RestaurantDashboard'
import DriverDashboard from './pages/dashboard/DriverDashboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/restaurant" element={<RestaurantDashboard />} />
          <Route path="/dashboard/driver" element={<DriverDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
