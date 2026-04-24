import { create } from 'zustand'

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem('pr-cart')) || { items: [], restaurantId: null } }
  catch { return { items: [], restaurantId: null } }
}

const persist = (state) => localStorage.setItem('pr-cart', JSON.stringify({ items: state.items, restaurantId: state.restaurantId }))

export const useCartStore = create((set, get) => ({
  ...loadCart(),

  addItem: (item, restaurantId) => {
    const state = get()
    if (state.restaurantId && state.restaurantId !== restaurantId) {
      if (!confirm('Trocar de restaurante? O carrinho atual sera limpo.')) return
      set({ items: [{ ...item, quantity: 1 }], restaurantId })
      persist(get())
      return
    }
    const existing = state.items.find((i) => i.id === item.id)
    if (existing) {
      set({ items: state.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i), restaurantId })
    } else {
      set({ items: [...state.items, { ...item, quantity: 1 }], restaurantId })
    }
    persist(get())
  },

  removeItem: (id) => {
    set((s) => {
      const items = s.items.filter((i) => i.id !== id)
      return { items, restaurantId: items.length ? s.restaurantId : null }
    })
    persist(get())
  },

  updateQuantity: (id, qty) => {
    if (qty < 1) return get().removeItem(id)
    set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: qty } : i) }))
    persist(get())
  },

  clearCart: () => {
    set({ items: [], restaurantId: null })
    localStorage.removeItem('pr-cart')
  },

  getTotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
}))
