import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import DishCard from "../DishCard";
import { CartContext } from "../../context/CartContext";

const TopDishes = ({ scrollVariants }) => {
    // State for storing dishes and tracking likes
    const [dishes, setDishes] = useState([]);
    const [currentDishIndex, setCurrentDishIndex] = useState(0);
    const getStoredLikes = () => JSON.parse(localStorage.getItem("likedDishes")) || {};
    const [likedDishes, setLikedDishes] = useState(getStoredLikes);
    const { addToCart } = useContext(CartContext);

    // Fetch dishes from JSON and sort by highest likes
    useEffect(() => {
        fetch("/Data/dishesData.json")
            .then((response) => response.json())
            .then((data) => {
                const sortedDishes = data.sort((a, b) => b.likes - a.likes).slice(0, 6);
                setDishes(sortedDishes);
            })
            .catch((error) => console.error("Error loading dishes:", error));
    }, []);

    // Navigate to the next dish
    const nextDish = () => {
        if (currentDishIndex < dishes.length - 1) {
            setCurrentDishIndex(currentDishIndex + 1);
        }
    };

    // Navigate to the previous dish
    const previousDish = () => {
        if (currentDishIndex > 0) {
            setCurrentDishIndex(currentDishIndex - 1);
        }
    };

    // Handle like/unlike functionality
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

    return (
        <motion.div
            className="ratedDishes bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-7 rounded-2xl flex flex-col items-center justify-center mt-6 md:mt-12"
            initial="hidden"
            whileInView="visible"
            variants={scrollVariants}
            viewport={{ once: true, amount: 0.3 }}
        >
            <p className="text-white text-xl md:text-2xl font-bold mb-8 md:mb-16">
                Our Highest Rated Dishes
            </p>

            <div className="flex justify-center w-full">
                {dishes.length > 0 ? (
                    <DishCard
                        dish={dishes[currentDishIndex]}
                        isLiked={!!likedDishes[dishes[currentDishIndex]?.id]}
                        onLikeToggle={() => handleLikeToggle(dishes[currentDishIndex]?.id)}
                        onAddToCart={() => addToCart(dishes[currentDishIndex])}
                    />
                ) : (
                    <p className="text-white">Loading...</p>
                )}
            </div>

            {/* Pagination Buttons */}
            <nav aria-label="Dish navigation" className="mt-6 md:mt-10">
                <ul className="inline-flex -space-x-px text-sm md:text-base">
                    <li>
                        <button
                            className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                            onClick={previousDish}
                        >
                            &lt;
                        </button>
                    </li>
                    {dishes.map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setCurrentDishIndex(index)}
                                className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight ${
                                    currentDishIndex === index
                                        ? "bg-orange-500 text-white"
                                        : "text-gray-700 bg-white border border-gray-300 hover:bg-orange-500 hover:text-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                            onClick={nextDish}
                        >
                            &gt;
                        </button>
                    </li>
                </ul>
            </nav>
        </motion.div>
    );
};

export default TopDishes;
