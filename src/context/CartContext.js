import React, { createContext, useContext, useState } from "react";

// إنشاء سياق العربة
const CartContext = createContext();

// مزود السياق
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // دالة لإضافة عنصر إلى السلة
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // دالة لإزالة عنصر من السلة
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// هوك لاستخدام سياق العربة
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return context;
};
