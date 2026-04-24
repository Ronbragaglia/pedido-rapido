import { useState, useEffect } from 'react'
import api from '../../api/client'
import { useSocket } from '../../hooks/useSocket'

const statusLabel = { PENDING: 'Pendente', ACCEPTED: 'Aceito', PREPARING: 'Preparando', READY: 'Pronto', DELIVERING: 'Entregando', DELIVERED: 'Entregue' }
const nextStatus = { PENDING: 'ACCEPTED', ACCEPTED: 'PREPARING', PREPARING: 'READY' }

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState([])

  useEffect(() => { api.get('/orders').then((r) => setOrders(r.data.orders)) }, [])

  useSocket('order:new', (order) => { setOrders((prev) => [order, ...prev]) })

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status })
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o))
  }

  const active = orders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status))
  const completed = orders.filter((o) => o.status === 'DELIVERED')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Painel do Restaurante</h1>

      <h2 className="font-bold text-lg mb-3">Pedidos Ativos ({active.length})</h2>
      <div className="space-y-3 mb-8">
        {active.map((o) => (
          <div key={o.id} className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">#{o.id}</span>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{statusLabel[o.status]}</span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {o.items?.map((i) => `${i.quantity}x ${i.menuItem?.name}`).join(', ')}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-brand-orange">R$ {o.total?.toFixed(2)}</span>
              {nextStatus[o.status] && (
                <button onClick={() => updateStatus(o.id, nextStatus[o.status])}
                  className="px-4 py-1.5 bg-brand-orange text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition">
                  {statusLabel[nextStatus[o.status]]}
                </button>
              )}
            </div>
          </div>
        ))}
        {active.length === 0 && <p className="text-gray-400 text-center py-6">Nenhum pedido ativo</p>}
      </div>

      <h2 className="font-bold text-lg mb-3">Concluidos ({completed.length})</h2>
      <div className="space-y-2">
        {completed.slice(0, 10).map((o) => (
          <div key={o.id} className="flex justify-between bg-white rounded-lg p-3 border border-gray-50 text-sm">
            <span>#{o.id} — {o.items?.length} itens</span>
            <span className="text-green-600 font-bold">R$ {o.total?.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
