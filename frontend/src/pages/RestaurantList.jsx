import { useState, useEffect } from 'react'
import api from '../api/client'
import RestaurantCard from '../components/RestaurantCard'
import CategoryFilter from '../components/CategoryFilter'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (category) params.category = category
    api.get('/restaurants', { params }).then((r) => setRestaurants(r.data.restaurants)).finally(() => setLoading(false))
  }, [search, category])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Restaurantes</h1>
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar restaurantes..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-brand-orange focus:outline-none" />
      </div>
      <CategoryFilter active={category} onChange={setCategory} />
      {loading ? (
        <p className="text-center text-gray-400 py-12">Carregando...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
      {!loading && restaurants.length === 0 && <p className="text-center text-gray-400 py-12">Nenhum restaurante encontrado</p>}
    </div>
  )
}
