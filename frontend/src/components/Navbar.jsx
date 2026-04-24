import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const items = useCartStore((s) => s.items)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-extrabold text-brand-orange">PedidoRapido</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/restaurants" className="text-gray-600 hover:text-brand-orange transition">Restaurantes</Link>
          {user && <Link to="/orders" className="text-gray-600 hover:text-brand-orange transition">Pedidos</Link>}
          {user?.role === 'RESTAURANT' && <Link to="/dashboard/restaurant" className="text-gray-600 hover:text-brand-orange transition">Painel</Link>}
          {user?.role === 'DRIVER' && <Link to="/dashboard/driver" className="text-gray-600 hover:text-brand-orange transition">Entregas</Link>}
          <Link to="/cart" className="relative text-gray-600 hover:text-brand-orange transition">
            <ShoppingCartIcon className="w-6 h-6" />
            {items.length > 0 && <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{items.length}</span>}
          </Link>
          {user ? (
            <button onClick={logout} className="text-gray-400 hover:text-red-500 transition text-sm">Sair</button>
          ) : (
            <Link to="/login" className="px-4 py-1.5 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition text-sm">Entrar</Link>
          )}
        </div>
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm">
          <Link to="/restaurants" onClick={() => setOpen(false)} className="block text-gray-600">Restaurantes</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="block text-gray-600">Carrinho ({items.length})</Link>
          {user ? (
            <>
              <Link to="/orders" onClick={() => setOpen(false)} className="block text-gray-600">Pedidos</Link>
              <button onClick={() => { logout(); setOpen(false) }} className="block text-red-500">Sair</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block text-brand-orange font-bold">Entrar</Link>
          )}
        </div>
      )}
    </nav>
  )
}
