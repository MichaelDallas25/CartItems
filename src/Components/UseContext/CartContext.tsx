import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import UseCartItems from "../CustomHook/UseCartItems";
import type { CartItem } from "../CustomHook/types";
import type { CartContextType } from "./types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cartItems: initialItems, loading } = UseCartItems();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!loading) setCartItems(initialItems);
  }, [initialItems, loading]);

  const removeItem = (id: number | string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const increment = (id: number | string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decrement = (id: number | string) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter(item => item.amount > 0)
    );
  };

  const total = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + Number(item.price) * item.amount, 0),
    [cartItems]
  );

  const itemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.amount, 0),
    [cartItems]
  );

  const value: CartContextType = {
    cartItems,
    loading,
    total,
    itemCount,
    removeItem,
    clearCart,
    increment,
    decrement,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Err");
  return context;
};