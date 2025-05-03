import React, {createContext, useEffect, useState} from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);

    // Load từ localStorage khi mount
    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCartItems(JSON.parse(stored));
    }, []);

    // Sync lên localStorage khi cartItems thay đổi
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
                    i === exist ? {...i, quantity: i.quantity + item.quantity} : i
                );
            }
            return [...prev, item];
        });
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart}}>
            {children}
        </CartContext.Provider>
    );
}
