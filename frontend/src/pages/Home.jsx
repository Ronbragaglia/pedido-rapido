import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-orange to-brand-red py-24 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Seus pratos favoritos, entregues na sua porta</h1>
        <p className="text-lg text-orange-100 max-w-lg mx-auto mb-8">Escolha entre centenas de restaurantes e receba seu pedido com rastreamento em tempo real</p>
        <Link to="/restaurants" className="inline-block px-8 py-3 bg-white text-brand-orange font-bold rounded-xl hover:shadow-lg transition">
          Ver Restaurantes
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-8">Como funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: '🔍', title: 'Escolha', desc: 'Navegue pelos restaurantes e monte seu pedido' },
            { emoji: '📱', title: 'Peca', desc: 'Finalize o pedido com entrega no seu endereco' },
            { emoji: '🛵', title: 'Receba', desc: 'Acompanhe em tempo real ate chegar na sua porta' },
          ].map((s) => (
            <div key={s.title} className="text-center">
              <div className="text-5xl mb-4">{s.emoji}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
