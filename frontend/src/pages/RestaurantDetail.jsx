import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/client'
import MenuItemCard from '../components/MenuItemCard'
import { useCartStore } from '../store/cartStore'
import { StarIcon } from '@heroicons/react/24/solid'

export default function RestaurantDetail() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => { api.get(`/restaurants/${id}`).then((r) => setRestaurant(r.data.restaurant)) }, [id])

  if (!restaurant) return <p className="text-center text-gray-400 py-12">Carregando...</p>

  const categories = [...new Set(restaurant.menuItems?.map((i) => i.category).filter(Boolean))]
  const uncategorized = restaurant.menuItems?.filter((i) => !i.category) || []

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        {restaurant.imageUrl && <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-48 object-cover rounded-2xl mb-4" />}
        <h1 className="text-2xl font-extrabold text-gray-900">{restaurant.name}</h1>
        <div className="flex items-center gap-3 mt-1">
          {restaurant.category && <span className="text-xs bg-orange-50 text-brand-orange font-bold px-2 py-0.5 rounded-full">{restaurant.category}</span>}
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-brand-yellow" />
            <span className="text-sm text-gray-600">{restaurant.rating?.toFixed(1)}</span>
          </div>
        </div>
        {restaurant.address && <p className="text-sm text-gray-400 mt-1">{restaurant.address}</p>}
        {restaurant.description && <p className="text-sm text-gray-500 mt-2">{restaurant.description}</p>}
      </div>

      <h2 className="font-bold text-lg text-gray-900 mb-4">Cardapio</h2>

      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">{cat}</h3>
          <div className="space-y-2">
            {restaurant.menuItems.filter((i) => i.category === cat).map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={(i) => addItem(i, restaurant.id)} />
            ))}
          </div>
        </div>
      ))}

      {uncategorized.length > 0 && (
        <div className="space-y-2">
          {uncategorized.map((item) => (
            <MenuItemCard key={item.id} item={item} onAdd={(i) => addItem(i, restaurant.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
