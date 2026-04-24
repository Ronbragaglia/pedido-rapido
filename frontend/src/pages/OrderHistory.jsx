import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700', ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-purple-100 text-purple-700', READY: 'bg-indigo-100 text-indigo-700',
  DELIVERING: 'bg-orange-100 text-orange-700', DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}
const statusLabel = {
  PENDING: 'Pendente', ACCEPTED: 'Aceito', PREPARING: 'Preparando', READY: 'Pronto',
  DELIVERING: 'Entregando', DELIVERED: 'Entregue', CANCELLED: 'Cancelado',
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => { api.get('/orders').then((r) => setOrders(r.data.orders)) }, [])

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Meus Pedidos</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} to={`/order/${o.id}`} className="block bg-white rounded-xl p-4 border border-gray-100 hover:shadow transition">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm">#{o.id} — {o.restaurant?.name}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor[o.status]}`}>{statusLabel[o.status]}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{o.items?.length} itens</span>
              <span className="font-bold text-brand-orange">R$ {o.total?.toFixed(2)}</span>
            </div>
          </Link>
        ))}
        {orders.length === 0 && <p className="text-center text-gray-400 py-12">Nenhum pedido ainda</p>}
      </div>
    </div>
  )
}
