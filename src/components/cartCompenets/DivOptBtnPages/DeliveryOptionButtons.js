import React, { useState } from "react";
import { FaMotorcycle, FaBox, FaUtensils } from "react-icons/fa";

const DeliveryOptionButton = ({ setSelectedOption }) => {
    const [selected, setSelected] = useState("Delivery");

    const handleSelection = (option) => {
        setSelected(option);
        setSelectedOption(option); // ✅ إرسال الخيار المحدد إلى الصفحة الأم (CheckOutPage)
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto px-4 my-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center mt-4">
                <button
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold border-2
                    ${selected === "Delivery" ? "border-orange-500 text-orange-500 bg-white" : "border-transparent text-gray-300 bg-gray-100"}
                    hover:border-orange-500 hover:text-orange-500 transition duration-300`}
                    onClick={() => handleSelection("Delivery")}
                >
                    <FaMotorcycle className="text-lg" />
                    Delivery
                </button>

                <button
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold border-2
                    ${selected === "Self-pickup" ? "border-orange-500 text-orange-500 bg-white" : "border-transparent text-gray-300 bg-gray-100"}
                    hover:border-orange-500 hover:text-orange-500 transition duration-300`}
                    onClick={() => handleSelection("Self-pickup")}
                >
                    <FaBox className="text-lg" />
                    Self-pickup
                </button>

                <button
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md font-bold border-2
                    ${selected === "Dining" ? "border-orange-500 text-orange-500 bg-white" : "border-transparent text-gray-300 bg-gray-100"}
                    hover:border-orange-500 hover:text-orange-500 transition duration-300`}
                    onClick={() => handleSelection("Dining")}
                >
                    <FaUtensils className="text-lg" />
                    Dining
                </button>
            </div>
        </div>
    );
};

export default DeliveryOptionButton;
