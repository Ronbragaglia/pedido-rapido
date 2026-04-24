import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('pr-user') || 'null'),
  token: localStorage.getItem('pr-token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('pr-user', JSON.stringify(user))
    localStorage.setItem('pr-token', token)
    set({ user, token })
  },
  logout: () => {
    localStorage.removeItem('pr-user')
    localStorage.removeItem('pr-token')
    set({ user: null, token: null })
  },
}))
