import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import api from '../api/client'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore()
  const restaurantId = useCartStore((s) => s.restaurantId)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const deliveryFee = 5.99
  const subtotal = getTotal()
  const total = subtotal + deliveryFee

  const checkout = async () => {
    if (!address) return alert('Informe o endereco de entrega')
    setLoading(true)
    try {
      const { data } = await api.post('/orders', {
        restaurantId,
        items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
        address,
      })
      clearCart()
      navigate(`/order/${data.order.id}`)
    } catch {
      alert('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <p className="text-gray-500">Seu carrinho esta vazio</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Carrinho</h1>
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex-1">
              <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
              <p className="text-brand-orange font-bold text-sm">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Endereco de entrega"
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm mb-4 focus:border-brand-orange focus:outline-none" />

      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-4 text-sm">
        <div className="flex justify-between mb-1"><span className="text-gray-500">Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span className="text-gray-500">Entrega</span><span>R$ {deliveryFee.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span className="text-brand-orange">R$ {total.toFixed(2)}</span></div>
      </div>

      <button onClick={checkout} disabled={loading}
        className="w-full py-3 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition disabled:opacity-50">
        {loading ? 'Finalizando...' : 'Finalizar Pedido'}
      </button>
    </div>
  )
}
