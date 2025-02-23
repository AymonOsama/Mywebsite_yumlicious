import React from "react";
import Swal from "sweetalert2";

const AlternativePaymentPopup = ({ paymentMethod }) => {
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
            Swal.fire("Success!", "Your payment has been processed.", "success");
        }
    });

    return null;
};

export default AlternativePaymentPopup;
