import { useContext, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext"; // ✅ استيراد السلة

const SuccessPopup = () => {
    const { clearCart } = useContext(CartContext); // ✅ دالة مسح السلة
    const navigate = useNavigate(); // ✅ دالة التوجيه
    const hasRun = useRef(false); // ✅ منع تنفيذ الكود مرتين

    useEffect(() => {
        if (hasRun.current) return; // ✅ منع التشغيل المتكرر
        hasRun.current = true;

        Swal.fire({
            title: "Order Placed Successfully!",
            text: "Your order has been placed successfully. Thank you for shopping with us!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#FF7F00", // ✅ لون الزر برتقالي
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart(); // ✅ مسح سلة المستخدم فقط
                navigate("/home"); // ✅ توجيه المستخدم إلى الصفحة الرئيسية بعد إغلاق الـ `popup`
            }
        });
    }, [clearCart, navigate]);  // ✅ الحل: إضافة التبعيات هنا

    return null; // ✅ لا يحتاج لعرض أي شيء في JSX
};

export default SuccessPopup;
