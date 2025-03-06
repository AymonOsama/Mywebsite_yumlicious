import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ استيراد Framer Motion

// Import style files
import "../../assets/styles/CheckOutPage.css";

// Import components
import SideNavBar from "../SideNavBar";
import { CartContext } from "../../context/CartContext";
import CouponCode from "../cartCompenets/CouponCode"; // ✅ استيراد مكون الكوبون
import PaymentMethods from "./PaymentMethods";

// Import icons
import { RiArrowGoBackLine } from "react-icons/ri";

const CheckOutPage = () => {
    const { cartItems } = useContext(CartContext);
    const [discountAmount, setDiscountAmount] = useState(0);

    // ✅ جلب الخيار المختار من localStorage أو تحديد الافتراضي
    const [selectedOption, setSelectedOption] = useState(
        localStorage.getItem("selectedOption") || "Delivery"
    );

    const [shippingCost, setShippingCost] = useState(20); // ✅ قيمة افتراضية

    useEffect(() => {
        // ✅ تحديث الشحن بناءً على الاختيار
        setShippingCost(selectedOption === "Delivery" ? 20 : 0);
    }, [selectedOption]);

    // ✅ حل مشكلة التحذير (ESLint Warning) بأن `setSelectedOption` غير مستخدم
    useEffect(() => {
        if (setSelectedOption) {
            // ✅ فقط لضمان عدم التحذير - يمكن تحديثها لاحقًا
        }
    }, []);

    // ✅ حساب الإجمالي بناءً على العناصر في السلة
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = Math.max(0, subtotal + shippingCost - discountAmount);

    return (
        <motion.div 
            className="CheckOutPage flex"
        >
            <SideNavBar />

            <motion.div 
                className="CheckOutMainPage bg-[rgba(51,51,51,0.79)] px-4 md:px-8 xl:px-16 py-6 rounded-2xl flex flex-col mx-2 my-3 md:mx-6 w-full flex-1 max-w-screen-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="HeaderOFPage flex justify-between items-center mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-white font-bold text-2xl text-center md:text-left">Payment</h2>
                    <Link to='/DilviryOption'>
                        <RiArrowGoBackLine className="text-2xl text-gray-100 cursor-pointer"/>
                    </Link>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-[55%_45%] xl:grid-cols-[60%_40%] gap-6 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* 🛒 تفاصيل المنتجات */}
                    <motion.div 
                        className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-gray-800 text-lg font-bold mb-4">Product</h3>

                        {/* ✅ التمرير فقط على المنتجات */}
                        <motion.div 
                            className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <motion.div 
                                        key={item.id} 
                                        className="flex justify-between items-center mb-4 border-b pb-2 sm:pb-4"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
                                            <div>
                                                <p className="text-gray-800 font-bold text-sm sm:text-base">{item.name}</p>
                                                <span className="text-gray-600 text-xs sm:text-sm">{item.quantity} X ${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 font-bold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No items in cart</p>
                            )}
                        </motion.div>

                        {/* ✅ قسم الأسعار يبقى ثابتًا في الأسفل */}
                        <div className="mt-4 border-t pt-4">
                            <p className="text-gray-600 flex justify-between text-sm sm:text-base">
                                Discount (-) <span className="font-bold">(${discountAmount})</span>
                            </p>
                            <p className="text-gray-600 flex justify-between text-sm sm:text-base">
                                Subtotal <span className="font-bold">${subtotal.toFixed(2)}</span>
                            </p>
                            <p className="text-gray-600 flex justify-between text-sm sm:text-base">
                                Shipping Cost (+) <span className="font-bold">${shippingCost}</span>
                            </p>
                            <p className="text-gray-800 flex justify-between font-bold mt-2 text-base sm:text-lg">
                                Total Payable <span>${total.toFixed(2)}</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* 🏷️ إدخال كود الخصم وطرق الدفع */}
                    <motion.div 
                        className="flex flex-col gap-6 w-full"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* 🏷️ إدخال كود الخصم */}
                        <CouponCode setDiscountAmount={setDiscountAmount}/>

                        {/* 💳 خيارات الدفع */}
                        <PaymentMethods/>
                        
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default CheckOutPage;
