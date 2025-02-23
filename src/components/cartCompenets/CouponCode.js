import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CouponCode = ({ setDiscountAmount }) => {
    const [discountData, setDiscountData] = useState([]);
    const [coupon, setCoupon] = useState(""); // ✅ لحفظ الكود المدخل

    // ✅ تحميل بيانات الكوبونات من JSON
    useEffect(() => {
        fetch("/Data/couponsData.json")
            .then((response) => response.json())
            .then((data) => setDiscountData(data))
            .catch((error) => console.log("Error loading coupons:", error));
    }, []);

    const handleApplyCoupon = () => {
        const foundCoupon = discountData.find((c) => c.code.toUpperCase() === coupon.toUpperCase());

        if (foundCoupon) {
            // ✅ كوبون صحيح - عرض رسالة تأكيد
            Swal.fire({
                title: `Coupon Applied!`,
                text: `You got a discount of $${foundCoupon.discount}. Do you want to use it?`,
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Yes, apply it!",
                cancelButtonText: "No, cancel",
                confirmButtonColor: "#FF7F00", // ✅ لون الزر البرتقالي
                cancelButtonColor: "#6c757d",
            }).then((result) => {
                if (result.isConfirmed) {
                    setDiscountAmount(foundCoupon.discount); // ✅ تحديث قيمة الخصم في CheckOutPage
                    Swal.fire({
                        title: "Success!",
                        text: "The coupon has been applied.",
                        icon: "success",
                        confirmButtonColor: "#FF7F00", // ✅ نفس اللون هنا أيضًا
                    });
                }
            });
        } else {
            // ❌ كوبون غير صحيح - عرض رسالة خطأ
            Swal.fire({
                title: "Invalid Coupon!",
                text: "The coupon code you entered is not valid.",
                icon: "error",
                confirmButtonColor: "#FF7F00", // ✅ نفس اللون هنا
            });
        }
    };

    return (
        <div className="bg-white px-4 py-6 rounded-lg shadow-md w-full">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Apply Coupon to get discount!</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 border border-orange-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-400"
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-md font-bold hover:bg-orange-600 transition w-full sm:w-auto"
                    onClick={handleApplyCoupon}
                >
                    Apply Code
                </button>
            </div>
        </div>
    );
};

export default CouponCode;
