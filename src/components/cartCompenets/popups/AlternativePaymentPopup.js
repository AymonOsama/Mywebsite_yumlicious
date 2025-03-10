import { useEffect, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext"; // ✅ استيراد السياق

const AlternativePaymentPopup = ({ paymentMethod, onClose }) => {
    const navigate = useNavigate(); // ✅ دالة التوجيه
    const { clearCart } = useContext(CartContext); // ✅ دالة مسح السلة
    const hasRun = useRef(false); // ✅ منع تكرار تشغيل الـ Popup

    useEffect(() => {
        if (hasRun.current) return; // ✅ تأكيد تشغيل `Swal.fire` مرة واحدة فقط
        hasRun.current = true;

        Swal.fire({
            title: `Proceed with ${paymentMethod}`,
            html: `
                <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                    ${paymentMethod === "PayPal" ? `
                        <label>Email Address</label>
                        <input type="email" id="paymentEmail" class="swal2-input" placeholder="example@gmail.com" />
                    ` : `
                        <label>Phone Number</label>
                        <input type="text" id="paymentPhone" class="swal2-input" placeholder="01XXXXXXXXX" />
                    `}
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm Payment",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#FF7F00", // ✅ لون الزر برتقالي
            cancelButtonColor: "#6c757d",
            preConfirm: () => {
                if (paymentMethod === "PayPal") {
                    const paymentEmail = document.getElementById("paymentEmail").value;
                    if (!paymentEmail) {
                        Swal.showValidationMessage("Please enter your PayPal email!");
                        return false;
                    }
                    return { paymentEmail };
                } else {
                    const paymentPhone = document.getElementById("paymentPhone").value;
                    if (!paymentPhone) {
                        Swal.showValidationMessage("Please enter your phone number!");
                        return false;
                    }
                    return { paymentPhone };
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Payment Details:", result.value);

                // ✅ عرض رسالة النجاح بعد التأكيد
                Swal.fire({
                    title: "Success!",
                    text: "Your payment has been processed successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#FF7F00",
                }).then(() => {
                    clearCart(); // ✅ مسح سلة المستخدم بعد نجاح الدفع
                    navigate("/home"); // ✅ توجيه المستخدم إلى الصفحة الرئيسية
                });
            }

            if (onClose) onClose(); // ✅ إغلاق النافذة بعد تنفيذ العملية
        });
    }, [paymentMethod, onClose, clearCart, navigate]); // ✅ إضافة كل التبعيات المهمة

    return null; // ✅ لا يوجد عنصر ليتم عرضه
};

export default AlternativePaymentPopup;
