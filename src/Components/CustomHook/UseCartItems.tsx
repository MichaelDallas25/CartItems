import { useState, useEffect } from "react";
import type { CartItem } from "../CustomHook/types";
import cartItemsData from "../../Dados/data";

function UseCartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCartItems(cartItemsData);
    setLoading(false);
  }, []);

  return { cartItems, loading };
}

export default UseCartItems;