import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const DishCard = ({ dish, isLiked, onLikeToggle, onAddToCart }) => {
    const { image, name, description, price, likes } = dish;
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        onAddToCart();
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <div className="flex bg-gray-700 text-white rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 w-full max-w-md relative overflow-hidden h-44">
            {/* ✅ صورة الوجبة */}
            <div className="w-1/3">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-l-lg transform hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* ✅ أيقونة الإعجاب */}
            <div
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                onClick={(e) => {
                    e.stopPropagation();
                    onLikeToggle();
                }}
            >
                <AiFillHeart
                    className={`text-lg ${isLiked ? "text-red-500 animate-pulse" : "text-gray-400"} transition-colors duration-300`}
                />
                <span className="text-sm font-bold text-gray-700 ml-1">{likes}</span>
            </div>

            {/* ✅ تفاصيل الوجبة */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-2">{name}</h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-orange-500">{price} $</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition transform hover:scale-105 w-20 sm:w-auto"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>

            {/* ✅ إشعار إضافة المنتج إلى السلة */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        ✅ Added to cart!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DishCard;
