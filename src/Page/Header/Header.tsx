import { ShoppingCart } from "lucide-react";
import useCartZustand from "../../zustand/store";

const Header = () => {
  const totalItems = useCartZustand(state => state.totalItems);

  return (
    <header className="bg-violet-700 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-semibold">UseContext</h1>
      <div className="relative cursor-pointer">
        <ShoppingCart className="text-3xl" />
        {totalItems > 0 && (
          <div className="absolute top-[-8px] right-[-10px] bg-white text-violet-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;