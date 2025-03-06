import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import components
import SideNavBar from "../SideNavBar";
import DeliveryOptionButton from "./DivOptBtnPages/DeliveryOptionButton";
import DeliveryPage from "./DivOptBtnPages/DilveryPage";
import SelfPickupAndDiningPage from "./DivOptBtnPages/SelfPickupAndDiningPage";

// Import Style Files
import "../../assets/styles/SelectDilviryOptionPage.css"; 

// Import icons
import { RiArrowGoBackLine } from "react-icons/ri";

const SelectDilviryOptionPage = () => {
    // ✅ تحميل `selectedOption` من `localStorage` أو استخدام القيمة الافتراضية
    const [selectedOption, setSelectedOption] = useState(
        localStorage.getItem("selectedOption") || "Delivery"
    );

    // ✅ حفظ `selectedOption` في `localStorage` عند تغييره
    useEffect(() => {
        localStorage.setItem("selectedOption", selectedOption);
    }, [selectedOption]);

    return (
        <motion.div 
            className="DivOptPage"
        >
            <SideNavBar />

            <motion.div 
                className="DivOptMainPage bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-4 rounded-2xl flex flex-col mx-2 md:mx-4 mt-3 mb-3 w-full flex-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
            >
                <div className="Header flex justify-between">
                    <p className="text-white font-bold text-left text-lg md:text-2xl font-sans">
                        Select Delivery Option
                    </p>
                    <Link to="/cart">
                        <RiArrowGoBackLine className="text-2xl text-gray-100 cursor-pointer" />
                    </Link>
                </div>

                {/* ✅ تمرير selectedOption و setSelectedOption إلى DeliveryOptionButton */}
                <DeliveryOptionButton 
                    selectedOption={selectedOption} 
                    setSelectedOption={setSelectedOption} 
                />

                {/* ✅ استخدام AnimatePresence للانتقالات بين DeliveryPage و SelfPickupAndDiningPage */}
                <div className="relative mt-6">
                    <AnimatePresence mode="wait">
                        {selectedOption === "Delivery" ? (
                            <motion.div 
                                key="delivery"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <DeliveryPage />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="pickup-dining"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <SelfPickupAndDiningPage />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SelectDilviryOptionPage;
