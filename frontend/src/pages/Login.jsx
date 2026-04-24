import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../api/client'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' })
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post(isRegister ? '/auth/register' : '/auth/login', form)
      setAuth(data.user, data.token); navigate('/')
    } catch (err) { setError(err.response?.data?.message || 'Erro') }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-extrabold text-center mb-6">{isRegister ? 'Criar Conta' : 'Entrar'}</h1>
        {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nome" required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
              <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm">
                <option value="CUSTOMER">Cliente</option>
                <option value="RESTAURANT">Restaurante</option>
                <option value="DRIVER">Entregador</option>
              </select>
            </>
          )}
          <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email" required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
          <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Senha" required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
          <button type="submit" className="w-full py-2.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition">
            {isRegister ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          {isRegister ? 'Ja tem conta?' : 'Nao tem conta?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-brand-orange font-bold">{isRegister ? 'Entrar' : 'Registrar'}</button>
        </p>
      </div>
    </div>
  )
}
