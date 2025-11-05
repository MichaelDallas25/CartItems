import { create } from "zustand";
import type { CartItem } from "./types";
import CartItems from "../Components/CartItems/CartItems";

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  increment: (id: number | string) => void;
  decrement: (id: number | string) => void;
  setCartItems: (items: CartItem[]) => void;
  getAmount: (id: number | string) => number;
  clearCart: () => void;
  removeItem: (id: number | string) => void;
}

const useCart = create<CartState>((set, get) => ({
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,

  setCartItems: (items) => {
    const totalItems = items.reduce((acc, item) => acc + item.amount, 0);
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    set({ cartItems: items, totalItems, totalAmount });
  },

  increment: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );

      const totalItems = updated.reduce((acc, item) => acc + item.amount, 0);
      const totalAmount = updated.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
      return { cartItems: updated, totalItems, totalAmount };
    }),

  decrement: (id) =>
    set((state) => {
      const updated = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      const totalItems = updated.reduce((acc, item) => acc + item.amount, 0);
      const totalAmount = updated.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );

      return { cartItems: updated, totalItems, totalAmount };
    }),

  getAmount: (id) => {
    const item = get().cartItems.find((item) => item.id === id);
    return item ? item.amount : 0;
  },

  clearCart: () => set({ cartItems: [], totalItems: 0 }),

  removeItem: (id) => {
    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);

      const totalItems = updated.reduce((acc, item) => acc + item.amount, 0);
      const totalAmount = updated.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );

      return { cartItems: updated, totalItems, totalAmount };
    });
  },
}));

export default useCart;
