import type { CartItem } from "../CustomHook/types";


export interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  total: number;
  itemCount: number;

  removeItem: (id: number | string) => void;
  clearCart: () => void;
  increment: (id: number | string) => void;
  decrement: (id: number | string) => void;
}