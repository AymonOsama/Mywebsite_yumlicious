import React, { useState } from "react";

// Import motion from framer-motion
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion & AnimatePresence

//Import icons
import { GiSettingsKnobs } from "react-icons/gi";

const MenuNavBar = ({ activeCategory, setActiveCategory, setSortOrder }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [tempSortOrder, setTempSortOrder] = useState(null);
    const tabs = ["Chicken", "Meat", "Desert", "Drink"];

    // Save sorting order and close the popup
    const handleSave = () => {
        setSortOrder(tempSortOrder);
        setIsFilterOpen(false);
    };

    return (
        <>
            {/* Dark overlay when popup is open */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFilterOpen(false)}
                    ></motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center justify-center px-4 py-6 bg-transparent relative z-50">
                {/* Navigation Tabs */}
                <div className="flex space-x-6 sm:space-x-12">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveCategory(tab)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`relative text-white text-xs sm:text-sm md:text-base font-semibold transition-all ${
                                activeCategory === tab
                                    ? "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white"
                                    : "hover:text-gray-300"
                            }`}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </div>

                {/* Filter Button */}
                <motion.button
                    className="ml-6 sm:ml-12 text-white text-lg sm:text-xl hover:text-gray-300 transition"
                    onClick={() => setIsFilterOpen(true)}
                    whileHover={{ rotate: 20, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <GiSettingsKnobs className="w-5 sm:w-6 h-5 sm:h-6" />
                </motion.button>
            </div>

            {/* Filter Popup */}
            <AnimatePresence>
                {isFilterOpen && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-center z-50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }} // **Smooth close animation**
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-72 sm:w-80 md:w-96">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 text-center">
                                Sort By Price
                            </h3>

                            {/* Sorting Options */}
                            <div className="flex flex-col space-y-2 sm:space-y-3">
                                <motion.button
                                    className={`w-full text-left px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md transition ${
                                        tempSortOrder === "lowToHigh"
                                            ? "bg-green-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setTempSortOrder("lowToHigh")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Low to High
                                </motion.button>
                                <motion.button
                                    className={`w-full text-left px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md transition ${
                                        tempSortOrder === "highToLow"
                                            ? "bg-green-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setTempSortOrder("highToLow")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    High to Low
                                </motion.button>
                            </div>

                            {/* Save & Cancel Buttons */}
                            <div className="flex justify-between mt-4 sm:mt-6">
                                <motion.button
                                    className="px-3 sm:px-2 py-1 sm:py-2 w-4/12 bg-red-500 text-white text-xs sm:text-sm rounded-md hover:bg-red-600 transition"
                                    onClick={() => setIsFilterOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    className="px-3 sm:px-2 py-1 sm:py-2 w-4/12 bg-green-500 text-white text-xs sm:text-sm rounded-md hover:bg-green-600 transition"
                                    onClick={handleSave}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Save
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MenuNavBar;
