import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // تحميل بيانات السلة من LocalStorage عند فتح الموقع
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // حفظ البيانات في LocalStorage عند أي تعديل في السلة
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // دالة لإضافة طبق إلى السلة
    const addToCart = (dish) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === dish.id);
            if (existingItem) {
                // لو الطبق موجود، نزوّد الكمية
                return prevItems.map((item) =>
                    item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // لو مش موجود، نضيفه للسلة
                return [...prevItems, { ...dish, quantity: 1 }];
            }
        });
    };

    // دالة لحذف طبق من السلة
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // دالة لتفريغ السلة بالكامل
    const clearCart = () => {
        setCartItems([]);
    };

    // دالة لتعديل الطبق المراد تعديله
    const updateCartItem = (id, newQuantity, isSpicy) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity, isSpicy } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart , updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};