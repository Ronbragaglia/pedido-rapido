import { useState, useEffect } from 'react'
import api from '../../api/client'

export default function DriverDashboard() {
  const [available, setAvailable] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => { api.get('/driver/available').then((r) => setAvailable(r.data.orders)).catch(() => {}) }, [])

  const accept = async (orderId) => {
    const { data } = await api.post(`/driver/accept/${orderId}`)
    setActive(data.order)
    setAvailable((prev) => prev.filter((o) => o.id !== orderId))
  }

  const complete = async () => {
    if (!active) return
    await api.put(`/driver/complete/${active.id}`)
    setActive(null)
    api.get('/driver/available').then((r) => setAvailable(r.data.orders))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Painel do Entregador</h1>

      {active && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-green-800 mb-2">Entrega Ativa — Pedido #{active.id}</h2>
          <p className="text-sm text-green-700">{active.restaurant?.name} → {active.address}</p>
          <p className="text-lg font-bold text-green-800 mt-2">R$ {active.total?.toFixed(2)}</p>
          <button onClick={complete} className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition">
            Entrega Concluida
          </button>
        </div>
      )}

      <h2 className="font-bold text-lg mb-3">Entregas Disponiveis ({available.length})</h2>
      <div className="space-y-3">
        {available.map((o) => (
          <div key={o.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
            <div>
              <span className="font-bold">#{o.id}</span>
              <p className="text-sm text-gray-500">{o.restaurant?.name} — {o.items?.length} itens</p>
              <p className="text-brand-orange font-bold">R$ {o.total?.toFixed(2)}</p>
            </div>
            <button onClick={() => accept(o.id)} className="px-4 py-2 bg-brand-orange text-white font-bold rounded-lg hover:bg-orange-600 transition">
              Aceitar
            </button>
          </div>
        ))}
        {available.length === 0 && !active && <p className="text-gray-400 text-center py-6">Nenhuma entrega disponivel</p>}
      </div>
    </div>
  )
}
