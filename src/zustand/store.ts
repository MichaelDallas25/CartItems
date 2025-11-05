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
 
}

const useCart = create<CartState>((set, get) => ({
  cartItems: [],
  totalItems: 0,
  totalAmount:0,




  setCartItems: (items) => {
    const totalItems = items.reduce((acc, item)=> acc + item.amount,0);
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.amount,
      0
    );
    set({cartItems:items,totalItems,totalAmount});
  },
  


  increment: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updated, totalItems: state.totalItems + 1 };
    }),

  decrement: (id) =>
    set((state) => {
      let totalItems = state.totalItems;
      const updated = state.cartItems
        .map((item) => {
          if (item.id === id) {
            totalItems -= 1;
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return { cartItems: updated, totalItems };
    }),

  getAmount: (id) => {
    const item = get().cartItems.find((item) => item.id === id);
    return item ? item.amount : 0;
  },

  clearCart: () => set({ cartItems: [], totalItems: 0 }),

 
}));

export default useCart;
