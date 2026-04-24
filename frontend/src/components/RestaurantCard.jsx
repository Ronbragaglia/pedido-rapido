import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition group">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        {restaurant.imageUrl ? (
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{restaurant.name}</h3>
        {restaurant.category && <span className="text-xs bg-orange-50 text-brand-orange font-bold px-2 py-0.5 rounded-full">{restaurant.category}</span>}
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="w-4 h-4 text-brand-yellow" />
          <span className="text-sm text-gray-600">{restaurant.rating?.toFixed(1) || '0.0'}</span>
        </div>
        {restaurant.address && <p className="text-xs text-gray-400 mt-1 truncate">{restaurant.address}</p>}
      </div>
    </Link>
  )
}
