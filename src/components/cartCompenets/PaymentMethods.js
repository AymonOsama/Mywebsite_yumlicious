import React, { useState } from "react";
import { FaPaypal, FaCcVisa } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import SuccessPopup from "./popups/SuccessPopup";
import PaymentPopup from "./popups/PaymentPopup";
import AlternativePaymentPopup from "./popups/AlternativePaymentPopup";
import SelectPaymentServicePopup from "./popups/OnlineGetaway"; // ✅ استيراد Popup اختيار الخدمة

const PaymentMethods = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [selectedService, setSelectedService] = useState(""); // ✅ تحديد خدمة الدفع عند اختيار Online Getaway
    const [popupType, setPopupType] = useState(null); // ✅ إدارة الـ popups بنوعها

    const handlePaymentChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
        setSelectedService(""); // ✅ إعادة تعيين الخدمة عند تغيير وسيلة الدفع
        setPopupType(null); // ✅ إغلاق أي popup مفتوحة عند تغيير الدفع
    };

    const handleServiceSelection = (service) => {
        setSelectedService(service);
        setPopupType("alternativePayment"); // ✅ فتح الـ popup بعد اختيار الخدمة
    };

    const handlePaymentSubmit = () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method first.");
            return;
        }

        if (selectedPaymentMethod === "Online Getaway" && !selectedService) {
            setPopupType("selectService"); // ✅ فتح Popup اختيار الخدمة فقط عند الضغط على Payment
            return;
        }

        // ✅ تعيين نوع الـ popup بناءً على وسيلة الدفع
        if (selectedPaymentMethod === "Cash on Delivery") {
            setPopupType("success");
        } else if (selectedPaymentMethod === "Direct Bank Transfer") {
            setPopupType("bankTransfer");
        }
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Payment</h3>

            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-gray-800">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="Direct Bank Transfer" 
                        checked={selectedPaymentMethod === "Direct Bank Transfer"}
                        onChange={handlePaymentChange}
                        className="text-orange-500"
                    /> 
                    Direct Bank Transfer
                </label>
                <label className="flex items-center gap-2 text-gray-800">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="Cash on Delivery" 
                        checked={selectedPaymentMethod === "Cash on Delivery"}
                        onChange={handlePaymentChange}
                        className="text-orange-500"
                    /> 
                    Cash on Delivery
                </label>
                <label className="flex items-center gap-2 text-gray-800">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="Online Getaway" 
                        checked={selectedPaymentMethod === "Online Getaway"}
                        onChange={handlePaymentChange}
                        className="text-orange-500"
                    /> 
                    Online Getaway
                </label>
            </div>

            {/* 🏦 طرق الدفع */}
            <div className="flex items-center gap-4 mt-4">
                <FaPaypal className="text-3xl text-gray-600" />
                <FaCcVisa className="text-3xl text-gray-600" />
                <GiTakeMyMoney className="text-3xl text-gray-600"/>
            </div>

            {/* ✅ زر الدفع */}
            <button 
                className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition w-full mt-6"
                onClick={handlePaymentSubmit}
            >
                Payment
            </button>

            {/* ✅ عرض الـ popup بناءً على `popupType` */}
            {popupType === "selectService" && <SelectPaymentServicePopup onSelectService={handleServiceSelection} />}
            {popupType === "success" && <SuccessPopup onClose={() => setPopupType(null)} />}
            {popupType === "bankTransfer" && <PaymentPopup paymentMethod={selectedPaymentMethod} onClose={() => setPopupType(null)} />}
            {popupType === "alternativePayment" && selectedService && (
                <AlternativePaymentPopup paymentMethod={selectedService} onClose={() => setPopupType(null)} />
            )}
        </div>
    );
};

export default PaymentMethods;
