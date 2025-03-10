// 📌 src/components/EditProfilePopup.js

import Swal from "sweetalert2";

const EditProfilePopup = async (user) => {
    try {
        const { value: formData } = await Swal.fire({
            title: "Edit Profile",
            html: `
                <input id="firstName" class="swal2-input" placeholder="First Name" value="${user?.firstName || ''}">
                <input id="lastName" class="swal2-input" placeholder="Last Name" value="${user?.lastName || ''}">
                <input id="email" type="email" class="swal2-input" placeholder="Email" value="${user?.email || ''}">
                <input id="phone" class="swal2-input" placeholder="Phone" value="${user?.phone || ''}">
                <input id="country" class="swal2-input" placeholder="Country" value="${user?.country || ''}">
                <input id="city" class="swal2-input" placeholder="City" value="${user?.city || ''}">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Save Changes",
            preConfirm: () => {
                try {
                    return {
                        firstName: document.getElementById("firstName").value.trim(),
                        lastName: document.getElementById("lastName").value.trim(),
                        email: document.getElementById("email").value.trim(),
                        phone: document.getElementById("phone").value.trim(),
                        country: document.getElementById("country").value.trim(),
                        city: document.getElementById("city").value.trim(),
                    };
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to read input values.",
                        icon: "error",
                        confirmButtonText: "OK"
                    });
                    return null;
                }
            }
        });

        if (!formData) return null; // المستخدم أغلق النافذة أو حدث خطأ

        // ✅ تحقق من صحة البيانات قبل الحفظ
        if (!formData.firstName || !formData.lastName || !formData.email) {
            await Swal.fire({
                title: "Validation Error",
                text: "First name, last name, and email are required fields.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return null;
        }

        // ✅ هنا يمكن إرسال البيانات للسيرفر أو حفظها محليًا (مثلاً في localStorage)
        // لو كان عندك API، هنا هتستدعي الـ fetch أو axios لإرسال البيانات

        // ✅ عرض تأكيد بعد حفظ التعديلات
        await Swal.fire({
            title: "Success!",
            text: "Your changes have been saved successfully.",
            icon: "success",
            confirmButtonText: "OK"
        });

        return formData;
    } catch (error) {
        // ❌ في حالة حدوث خطأ عام أثناء التعديل
        await Swal.fire({
            title: "Error!",
            text: "An unexpected error occurred. Please try again later.",
            icon: "error",
            confirmButtonText: "OK"
        });

        return null;
    }
};

export default EditProfilePopup;
