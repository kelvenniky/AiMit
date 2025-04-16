// CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartActive, setCartActive] = useState(false);

  return (
    <CartContext.Provider value={{ cartActive, setCartActive }}>
      {children}
    </CartContext.Provider>
  );
};