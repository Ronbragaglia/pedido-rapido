import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import OrderStatusTimeline from '../components/OrderStatusTimeline'
import { useSocket } from '../hooks/useSocket'

export default function OrderTracking() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => { api.get(`/orders/${id}`).then((r) => setOrder(r.data.order)) }, [id])

  const onStatus = useCallback((data) => {
    if (data.orderId === Number(id)) setOrder((prev) => prev ? { ...prev, status: data.status } : prev)
  }, [id])

  useSocket('order:status', onStatus, `order:${id}`)

  if (!order) return <p className="text-center text-gray-400 py-12">Carregando...</p>

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Pedido #{order.id}</h1>
      <p className="text-sm text-gray-500 mb-6">{order.restaurant?.name} — {order.address}</p>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-6">
        <OrderStatusTimeline status={order.status} />
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <h3 className="font-bold text-sm mb-3">Itens</h3>
        {order.items?.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.quantity}x {item.menuItem?.name}</span>
            <span className="text-gray-500">R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-3 pt-3 border-t">
          <span>Total</span>
          <span className="text-brand-orange">R$ {order.total?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
