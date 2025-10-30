import { ArrowDown, ArrowUp } from "lucide-react";
import { useCart } from "../UseContext/CartContext";

function CartItems() {
  const { cartItems, loading, total, removeItem, increment, decrement, clearCart } = useCart();

  if (loading) return <p>Carregando itens...</p>;

  if (cartItems.length === 0)
    return <p className="text-center text-gray-600 mt-10">Seu carrinho está vazio</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-xl mt-8">
      <h1 className="text-3xl font-light text-center mb-10 tracking-widest text-gray-800">YOUR BAG</h1>

      <section className="space-y-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-start border-b pb-4">
            <div className="flex gap-4">
              <img src={item.img} alt={item.title} className="w-16 h-20 object-contain" />
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">Preço: €{item.price}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                >
                  remover
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-1 text-purple-600">
              <button onClick={() => increment(item.id)}><ArrowUp /></button>
              <span>{item.amount}</span>
              <button onClick={() => decrement(item.id)}><ArrowDown /></button>
            </div>
          </div>
        ))}
      </section>

      <div className="border-t border-gray-300 my-8"></div>

      <footer className="flex flex-col items-center space-y-6">
        <div className="w-full flex justify-between items-center text-lg font-medium">
          <span className="text-gray-700">Total</span>
          <span className="text-2xl font-semibold text-blue-700">€{total.toFixed(2)}</span>
        </div>

        <button
          onClick={clearCart}
          className="px-6 py-2 text-sm text-purple-700 border border-purple-400 rounded-md hover:bg-purple-50 transition duration-150"
        >
          Clear Cart
        </button>
      </footer>
    </main>
  );
}

export default CartItems;
