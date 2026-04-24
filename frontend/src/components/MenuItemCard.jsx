import { PlusIcon } from '@heroicons/react/24/outline'

export default function MenuItemCard({ item, onAdd }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
        {item.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.description}</p>}
        <p className="text-brand-orange font-bold mt-1">R$ {item.price?.toFixed(2)}</p>
      </div>
      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />}
      <button onClick={() => onAdd(item)} className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition flex-shrink-0">
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
