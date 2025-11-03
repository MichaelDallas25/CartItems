import { create } from "zustand";
import type { CartItemZustand } from './types'

interface CartState {
  cartItems: CartItemZustand[];
  totalItems: number;
  increment: (id: number | string) => void;
  decrement: (id: number | string) => void;
  setCartItems: (items: CartItemZustand[]) => void;
  getAmount: (id: number | string) => number;
  clearCart: () => void;
}

const useCartZustand = create<CartState>((set, get) => ({
  cartItems: [],
  totalItems: 0,

  setCartItems: (items) => set({ 
    cartItems: items, 
    totalItems: items.reduce((sum, item) => sum + item.amount, 0)
  }),

  increment: (id) =>
    set((state) => {
      const updated = state.cartItems.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updated, totalItems: state.totalItems + 1 };
    }),

  decrement: (id) =>
    set((state) => {
      let totalItems = state.totalItems;
      const updated = state.cartItems
        .map(item => {
          if (item.id === id) {
            totalItems -= 1;
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter(item => item.amount > 0);
      return { cartItems: updated, totalItems };
    }),

  getAmount: (id) => {
    const item = get().cartItems.find(item => item.id === id);
    return item ? item.amount : 0;
  },

  clearCart: () => set({ cartItems: [], totalItems: 0 }),
}));

export default useCartZustand;