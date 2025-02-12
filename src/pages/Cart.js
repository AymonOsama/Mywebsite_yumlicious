import React from "react";
import { motion } from "framer-motion"; // استيراد framer-motion

// Import style files
import "../assets/styles/Cart.css";

// Import images
import image1 from "../assets/images/res_1.jpg";

// Import components
import SideNavBar from "../components/SideNavBar";

const Cart = () => {
    return (
        <motion.div 
            className="allCartPage flex flex-col min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <SideNavBar />
            <motion.div 
                className="bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-4 rounded-2xl flex flex-col mx-2 md:mx-4 mt-3 mb-3 w-full flex-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <motion.div 
                    className="Header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <p className="text-white font-bold text-left text-lg md:text-2xl font-sans">
                        Shopping Cart
                    </p>
                </motion.div>

                <motion.div 
                    className="dishesOrderdCon mt-10 flex flex-col w-full gap-8 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <motion.div 
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
                                src={image1}
                                className="cartImage w-32 md:w-56 rounded-2xl"
                                alt="Grilled Chicken"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </motion.div>

                        {/* اسم الوجبة */}
                        <div className="dishCon text-center md:text-left flex-1">
                            <p className="DishTitle text-white text-lg md:text-xl font-bold">
                                Grilled chicken
                            </p>
                            <p className="DishDesc text-gray-400 text-sm md:w-44 pt-2 md:pt-5">
                                Grilled chicken with rice, peas, salads and bread
                            </p>
                            <p className="DishQuatity text-white text-lg md:text-xl font-bold pt-4 md:pt-10">
                                Quantity:{" "}
                                <span className="Quantity Count text-orange-500">1</span>
                            </p>
                        </div>

                        {/* سعر الوجبة والتحكم */}
                        <motion.div 
                            className="DishControl mt-4 md:mt-0 text-center md:text-right flex flex-col items-center md:items-end"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <p className="DishPrice text-white text-lg md:text-2xl font-semibold">
                                51 $
                            </p>
                            <div className="ControlButtons flex gap-4 mt-4 md:mt-24">
                                <motion.button 
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Edit
                                </motion.button>
                                <motion.button 
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    Remove
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* خط فاصل */}
                    <motion.div 
                        className="border-t-2 border-gray-500 mt-1"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1 }}
                    />
                </motion.div>

                {/* Subtotal and Button */}
                <motion.div 
                    className="totalPriceAndCun mt-auto flex flex-col md:flex-row justify-between items-center w-full p-4 rounded-lg gap-4 md:gap-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                >
                    <p className="text-white text-lg md:text-xl font-bold">
                        Subtotal: <span className="text-orange-500">$100</span>
                    </p>
                    <motion.button 
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Select Delivery Option
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Cart;
