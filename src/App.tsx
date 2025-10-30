import CartItems from "./Components/CartItems/CartItems";
import Header from "./Page/Header/Header";
import { CartProvider } from "./Components/UseContext/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <CartItems />
      </CartProvider>
    </>
  );
}

export default App;
