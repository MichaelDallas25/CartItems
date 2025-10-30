export interface CartItem {
  id: number | string;
  title: string;
  price: number | string;
  img: string;
  amount: number;
}

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