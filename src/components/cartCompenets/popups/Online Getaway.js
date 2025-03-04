import Swal from "sweetalert2";

const SelectPaymentServicePopup = ({ onSelectService }) => {
    Swal.fire({
        title: "Select a Payment Service",
        input: "select",
        inputOptions: {
            PayPal: "PayPal",
            "Vodafone Cash": "Vodafone Cash",
            "Orange Cash": "Orange Cash",
            "Etisalat Cash": "Etisalat Cash",
        },
        inputPlaceholder: "Choose your payment service",
        showCancelButton: true,
        confirmButtonText: "Next",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#FF7F00", // لون الزر برتقالي
        cancelButtonColor: "#6c757d",
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            onSelectService(result.value);
        }
    });

    return null;
};

export default SelectPaymentServicePopup;
