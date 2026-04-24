const steps = [
  { key: 'PENDING', label: 'Pendente' },
  { key: 'ACCEPTED', label: 'Aceito' },
  { key: 'PREPARING', label: 'Preparando' },
  { key: 'READY', label: 'Pronto' },
  { key: 'DELIVERING', label: 'Entregando' },
  { key: 'DELIVERED', label: 'Entregue' },
]

export default function OrderStatusTimeline({ status }) {
  const currentIdx = steps.findIndex((s) => s.key === status)

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const done = i <= currentIdx
        const active = i === currentIdx
        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? (active ? 'bg-brand-orange text-white' : 'bg-green-500 text-white') : 'bg-gray-200 text-gray-400'}`}>
              {done && !active ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-bold ${done ? (active ? 'text-brand-orange' : 'text-green-600') : 'text-gray-400'}`}>{step.label}</span>
          </div>
        )
      })}
    </div>
  )
}
