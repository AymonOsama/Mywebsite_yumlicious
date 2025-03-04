import  { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext"; // ✅ استيراد السياق

const PaymentPopup = ({ paymentMethod }) => {
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext); // ✅ جلب دالة مسح الكارت

    if (paymentMethod === "Online Getaway" || paymentMethod === "Direct Bank Transfer") {
        Swal.fire({
            title: `Proceed with ${paymentMethod}`,
            html: `
                <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                    <label>Card Number</label>
                    <input type="text" id="cardNumber" class="swal2-input" placeholder="1234 5678 9012 3456" maxlength="16" />

                    <label>Expiration Date</label>
                    <input type="text" id="expiryDate" class="swal2-input" placeholder="MM/YY" maxlength="5" />

                    <label>CVV</label>
                    <input type="text" id="cvv" class="swal2-input" placeholder="123" maxlength="4" />
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm Payment",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#FF7F00",
            cancelButtonColor: "#6c757d",
            didOpen: () => {
                const expiryDateInput = document.getElementById("expiryDate");
                expiryDateInput.addEventListener("input", (event) => {
                    let value = event.target.value.replace(/\D/g, "");
                    if (value.length >= 2) {
                        value = value.slice(0, 2) + "/" + value.slice(2, 4);
                    }
                    event.target.value = value;
                });
            },
            preConfirm: () => {
                const cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, "");
                const expiryDate = document.getElementById("expiryDate").value;
                const cvv = document.getElementById("cvv").value;

                if (!/^(4|5|3)[0-9]{15}$/.test(cardNumber)) {
                    Swal.showValidationMessage("Invalid card number! Must be 16 digits and start with 4, 5, or 3.");
                    return false;
                }

                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
                    Swal.showValidationMessage("Invalid expiration date! Format must be MM/YY.");
                    return false;
                }

                if (!/^\d{3,4}$/.test(cvv)) {
                    Swal.showValidationMessage("Invalid CVV! Must be 3 or 4 digits.");
                    return false;
                }

                return { cardNumber, expiryDate, cvv };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Payment Details:", result.value);

                // ✅ مسح العناصر من الكارت قبل التوجيه
                clearCart();

                Swal.fire({
                    title: "Success!",
                    text: "Your payment has been processed.",
                    icon: "success",
                    confirmButtonColor: "#FF7F00",
                }).then(() => {
                    navigate("/home"); // ✅ إعادة التوجيه إلى الصفحة الرئيسية
                });
            }
        });
    } else {
        Swal.fire({
            title: "Invalid Payment Method",
            text: "Please select a valid online payment method.",
            icon: "error",
            confirmButtonColor: "#FF7F00",
        });
    }

    return null;
};

export default PaymentPopup;
