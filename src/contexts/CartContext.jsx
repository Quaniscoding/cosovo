import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exist = prev.find(
        (i) =>
          i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (exist) {
        return prev.map((i) =>
          i === exist ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };
  const deleteFromCart = (item) => {
    setCartItems((prev) =>
      prev.filter(
        (i) =>
          !(i.id === item.id && i.color === item.color && i.size === item.size)
      )
    );
  };
  const updateCartItem = (item, newQuantity) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id && i.color === item.color && i.size === item.size
          ? { ...i, quantity: newQuantity }
          : i
      )
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
        clearCart,
        updateCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
