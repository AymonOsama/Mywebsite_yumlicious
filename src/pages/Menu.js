import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

// Import components
import SideNavBar from "../components/SideNavBar";
import MenuNavBar from "../components/MenuNavBar";
import DishCard from "../components/DishCard";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext"; // ✅ جلب الـ Context

// Import styles
import "../assets/styles/Menu.css";

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [activeCategory, setActiveCategory] = useState("Chicken");
    const [sortOrder, setSortOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // عدد الأطباق في كل صفحة
    const { addToCart } = useContext(CartContext);  // ✅ جلب دالة الإضافة

    // استرجاع الإعجابات من localStorage عند تحميل الصفحة
    const getStoredLikes = () => JSON.parse(localStorage.getItem("likedDishes")) || {};
    const [likedDishes, setLikedDishes] = useState(getStoredLikes);

    useEffect(() => {
        fetch("/data/dishesData.json")
            .then((response) => response.json())
            .then((data) => {
                const dishesWithId = data.map((dish, index) => ({
                    ...dish,
                    id: dish.id || index + 1, // إضافة ID تلقائي إذا لم يكن موجودًا
                }));
                setDishes(dishesWithId);
            })
            .catch((error) => console.error("Error loading dishes:", error));
    }, []);

    // تحديث الإعجاب عند الضغط على القلب
    const handleLikeToggle = (id) => {
        setLikedDishes((prevLikes) => {
            const newLikes = { ...prevLikes, [id]: !prevLikes[id] };
            localStorage.setItem("likedDishes", JSON.stringify(newLikes));
            return newLikes;
        });

        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish.id === id
                    ? { ...dish, likes: likedDishes[id] ? dish.likes - 1 : dish.likes + 1 }
                    : dish
            )
        );
    };

    let filteredDishes = dishes.filter((dish) => dish.category === activeCategory);

    if (sortOrder === "lowToHigh") {
        filteredDishes = [...filteredDishes].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
        filteredDishes = [...filteredDishes].sort((a, b) => b.price - a.price);
    }

    // **📌 حساب عدد الصفحات**
    const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
    
    // **📌 تحديد العناصر التي سيتم عرضها في الصفحة الحالية**
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDishes.slice(indexOfFirstItem, indexOfLastItem);

    // **📌 التحكم في تغيير الصفحات**
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const previousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <motion.div
            className="MenuPage flex justify-center min-h-screen flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <SideNavBar />
            <div className="MeneMainPage w-full max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-20 flex-grow">
                <div className="menu1 w-full flex justify-center">
                    <MenuNavBar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        setSortOrder={setSortOrder}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 my-10 px-4">
                    {currentItems.length === 0 ? (
                        <p className="text-center text-gray-500">No Dishes available.</p>
                    ) : (
                        currentItems.map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                                isLiked={!!likedDishes[dish.id]}
                                onLikeToggle={() => handleLikeToggle(dish.id)}
                                onAddToCart={() => addToCart(dish)}
                            />
                        ))
                    )}
                </div>

                {/* 📌 أزرار التنقل بين الصفحات */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 mb-10">
                        <button
                            className={`px-4 py-2 mx-1 bg-gray-700 text-white rounded-md ${
                                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                            }`}
                            onClick={previousPage}
                            disabled={currentPage === 1}
                        >
                            ❮ Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 mx-1 rounded-md ${
                                    currentPage === index + 1
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-4 py-2 mx-1 bg-gray-700 text-white rounded-md ${
                                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
                            }`}
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next ❯
                        </button>
                    </div>
                )}
                {/* ✅ ضمان أن الفوتر يبقى دائمًا في الأسفل */}
                <Footer className="mt-auto" />
            </div>

            
        </motion.div>
    );
};

export default Menu;
