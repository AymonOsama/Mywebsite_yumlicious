import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ استيراد useNavigate

// Import style files
import "../assets/styles/Cart.css";

// Import components
import SideNavBar from "../components/SideNavBar";
import { CartContext } from "../context/CartContext";
import EditDishPopup from "../components/cartCompenets/EditDishPopup";


const Cart = () => {
    const { cartItems, removeFromCart, clearCart, updateCartItem } = useContext(CartContext);
    const [notification, setNotification] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const navigate = useNavigate(); // ✅ تهيئة التنقل


    // ✅ دالة لإظهار الإشعار عند حذف عنصر واحد
    const handleRemoveItem = (id) => {
        removeFromCart(id);
        setNotification({ message: "Item Removed!", type: "error" });

        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    // ✅ دالة لإظهار الإشعار عند حذف كل العناصر
    const handleClearCart = () => {
        clearCart();
        setNotification({ message: "All Items Removed!", type: "error" });

        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    // ✅ دالة التعديل علي الوجبات 
    const handleEditItem = (item) => {
        setEditingItem(item);
    };
    
    // ✅ دالة حفظ التعديلات علي الوجبات
    const handleSaveChanges = (updatedItem) => {
        updateCartItem(updatedItem.id, updatedItem.quantity, updatedItem.isSpicy); // ✅ التحديث هنا هيشتغل
        setEditingItem(null);
    };

    // ✅ حساب الإجمالي
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <motion.div 
            className="allCartPage flex flex-col min-h-screen overflow-hidden"
        >
            <SideNavBar />

            {/* ✅ إشعار الحذف */}
            {notification && (
                <motion.div
                    className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white text-center shadow-md ${
                        notification.type === "error" ? "bg-red-500" : "bg-green-500"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    {notification.message}
                </motion.div>
            )}

            <motion.div 
                className="bg-[rgba(51,51,51,0.79)] w-full px-4 py-4 my-3 mx-4 flex flex-col justify-between rounded-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <motion.div className="Header">
                    <p className="text-white font-bold text-left text-lg md:text-2xl font-sans">
                        Shopping Cart
                    </p>
                </motion.div>

                {/* 📌 المنتجات داخل السلة */}
                <motion.div className="dishesOrderdCon mt-10 flex flex-col w-full gap-8 overflow-y-auto">
                    {cartItems.length > 0 ? (
                        cartItems.map((dish) => (
                            <motion.div 
                                key={dish.id}
                                className="dish flex flex-col md:flex-row w-full gap-6"
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* صورة الوجبة */}
                                <motion.div 
                                    className="dishImg mx-auto md:mx-0"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.img
                                        src={dish.image}
                                        className="cartImage w-32 md:w-56 rounded-2xl"
                                        alt={dish.name}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </motion.div>

                                {/* اسم الوجبة */}
                                <div className="dishCon text-center md:text-left flex-1">
                                    <p className="DishTitle text-white text-lg md:text-xl font-bold">
                                        {dish.name}
                                    </p>
                                    <p className="DishDesc text-gray-400 text-sm md:w-44 pt-2 md:pt-5">
                                        {dish.description}
                                    </p>
                                    <p className="DishQuatity text-white text-lg md:text-xl font-bold pt-4 md:pt-10">
                                        Quantity:{" "}
                                        <span className="Quantity Count text-orange-500">{dish.quantity}</span>
                                    </p>
                                </div>

                                {/* سعر الوجبة والتحكم */}
                                <motion.div className="DishControl mt-4 md:mt-0 text-center md:text-right flex flex-col items-center md:items-end">
                                    <p className="DishPrice text-white text-lg md:text-2xl font-semibold">
                                        ${dish.price * dish.quantity}
                                    </p>
                                    <div className="ControlButtons flex gap-4 mt-4 md:mt-24">
                                        <motion.button 
                                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleEditItem(dish)}
                                        >
                                            Edit
                                        </motion.button>
                                        <motion.button 
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemoveItem(dish.id)} // ✅ تمرير ID العنصر المحذوف
                                        >
                                            Remove
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-white text-lg">Your cart is empty.</p>
                    )}

                    {/* خط فاصل */}
                    <motion.div 
                        className="border-t-2 border-gray-500 mt-auto"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1 }}
                    />
                </motion.div>

                {/* إجمالي السعر و زر حذف كل شيء */}
                <motion.div 
                    className="totalPriceAndCun mt-auto flex flex-col md:flex-row justify-between items-center w-full p-4 rounded-lg gap-4 md:gap-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <p className="text-white text-lg md:text-xl font-bold">
                        Subtotal: <span className="text-orange-500">${totalPrice.toFixed(2)}</span>
                    </p>
                    <motion.div className="flex gap-4">
                    <motion.button 
                        className={`px-6 py-2 rounded-md transition ${
                            cartItems.length === 0 
                                ? "bg-gray-500 cursor-not-allowed"  // ✅ تعطيل الزر وتغيير اللون عند عدم وجود عناصر
                                : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        whileHover={cartItems.length > 0 ? { scale: 1.08, transition: { duration: 0.1, ease: "easeInOut" } } : {}}
                        whileTap={cartItems.length > 0 ? { scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } } : {}}
                        onClick={() => cartItems.length > 0 && handleClearCart()} // ✅ منع التنفيذ عند عدم وجود عناصر
                        disabled={cartItems.length === 0} // ✅ تعطيل الزر عند عدم وجود عناصر
                    >
                        Clear Cart
                    </motion.button>

                        <motion.button 
                            className={`px-6 py-2 rounded-md transition ${
                                cartItems.length === 0 
                                    ? "bg-gray-500 cursor-not-allowed"  // ✅ تعطيل الزر وتغيير اللون عند عدم وجود عناصر
                                    : "bg-orange-500 hover:bg-orange-600 text-white"
                            }`}
                            whileHover={{ scale: cartItems.length > 0 ? 1.1 : 1 }} 
                            whileTap={{ scale: cartItems.length > 0 ? 0.9 : 1 }}
                            onClick={() => cartItems.length > 0 && navigate("/DilviryOption")} // ✅ منع التنقل عند عدم وجود عناصر
                            disabled={cartItems.length === 0} // ✅ تعطيل الزر عند عدم وجود عناصر
                        >
                            Select Delivery Option
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {editingItem && (
            <EditDishPopup 
                dish={editingItem} 
                onClose={() => setEditingItem(null)} 
                onSave={handleSaveChanges} 
            />
)}

        </motion.div>
    );
};

export default Cart;
