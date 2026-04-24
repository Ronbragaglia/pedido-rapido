const categories = ['Todos', 'Pizza', 'Hamburguer', 'Japonesa', 'Brasileira', 'Italiana', 'Saudavel', 'Sobremesas']

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button key={cat} onClick={() => onChange(cat === 'Todos' ? '' : cat)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${(cat === 'Todos' && !active) || active === cat ? 'bg-brand-orange text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-orange'}`}>
          {cat}
        </button>
      ))}
    </div>
  )
}
