import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productWithQuantity) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === productWithQuantity.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === productWithQuantity.id ? { ...item, quantity: item.quantity + productWithQuantity.quantity } : item
        );
      } else {
        return [...prevItems, { ...productWithQuantity }];
      }
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
