import { useContext, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // El estado inicial debe ser lo guardado en localStorage.
  // Pero si no hay un valor anterior (ej: primera visita), podemos dar un valor inicial alternativo.
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // En lugar de pasar setCart, pasamos esta función, para que cuando se llame desde cualquier sitio, se actualice el localStorage.
  const enhancedSetCart = (v) => {
    setCart(v);
    localStorage.setItem("cart", JSON.stringify(v));
  };

  return (
    <CartContext.Provider value={[cart, enhancedSetCart]}>
      {children}
    </CartContext.Provider>
  );
};
