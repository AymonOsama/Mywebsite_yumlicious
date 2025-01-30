import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Import components
import SideNavBar from "../components/SideNavBar";
import MenuNavBar from "../components/MenuNavBar";
import DishCard from "../components/DishCard";
import Footer from "../components/Footer";

// Import styles
import "../assets/styles/Menu.css";

const Menu = () => {
    const [dishes, setDishes] = useState([]); // Store dishes from JSON
    const [activeCategory, setActiveCategory] = useState("Chicken");
    const [sortOrder, setSortOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Fetch dishes from JSON file
    useEffect(() => {
        fetch("/data/dishesData.json") // Correct path to the JSON file in the `public` folder
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch dishes data");
                }
                return response.json();
            })
            .then((data) => setDishes(data))
            .catch((error) => console.error("Error loading dishes:", error));
    }, []);

    // Filter dishes by category
    let filteredDishes = dishes.filter((dish) => dish.category === activeCategory);

    // Sort dishes based on price
    if (sortOrder === "lowToHigh") {
        filteredDishes = [...filteredDishes].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
        filteredDishes = [...filteredDishes].sort((a, b) => b.price - a.price);
    }

    // Pagination logic
    const totalPages = Math.ceil(filteredDishes.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDishes.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const previousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <motion.div
            className="MenuPage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <SideNavBar />
            <div className="MeneMainPage w-full">
                <div className="menu1 w-full flex justify-center">
                    <MenuNavBar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        setSortOrder={setSortOrder}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 my-10 px-4 lg:ml-10">
                    {currentItems.length === 0 ? (
                        <p className="text-center text-gray-500">No items available.</p>
                    ) : (
                        currentItems.map((dish, index) => <DishCard key={index} dish={dish} />)
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 mb-20">
                    <nav aria-label="Page navigation example" className="justify-center">
                        <ul className="inline-flex -space-x-px text-sm md:text-base">
                            <li>
                                <button
                                    className={`px-3 md:px-4 h-8 md:h-10 text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-orange-500 hover:text-white ${
                                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={previousPage}
                                    disabled={currentPage === 1}
                                >
                                    &lt;
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 md:px-4 h-8 md:h-10 ${
                                            currentPage === index + 1
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
                                    className={`px-3 md:px-4 h-8 md:h-10 text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-orange-500 hover:text-white ${
                                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    &gt;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <Footer />
            </div>
        </motion.div>
    );
};

export default Menu;
