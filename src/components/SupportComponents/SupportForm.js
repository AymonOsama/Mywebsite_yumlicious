import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const SupportForm = () => {
    const [formData, setFormData] = useState({
        phone: "",
        issueType: "General Inquiry",
        message: "",
    });

    const [user, setUser] = useState(null);

    // ✅ Load user data from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(storedUser);
    }, []);

    // ✅ Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission with SweetAlert2 popup
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user || user.firstName === "Guest") {
            // ✅ Show alert if user is a Guest
            Swal.fire({
                title: "Access Denied",
                text: "You need to sign in first to send a complaint.",
                icon: "warning",
                confirmButtonText: "Login Now",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                customClass: {
                    confirmButton: "Sucess-button",
                    cancelButton: "inVaild-button",
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login"; // ✅ Redirect to login page
                }
            });

            return;
        }

        // ✅ Show success popup
        Swal.fire({
            title: "Message Sent!",
            text: "Your request has been successfully sent to the administration.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "Sucess-button",
            }
        });

        // ✅ Reset form fields
        setFormData({ phone: "", issueType: "General Inquiry", message: "" });
    };

    return (
        <motion.div 
            className="supportContainer bg-[rgba(51,51,51,0.79)] px-6 md:px-10 py-7 rounded-2xl flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2 className="text-white text-2xl font-semibold mb-4">Support & Help</h2>
            <p className="text-white mb-6">
                If you have any issues or suggestions, please fill out the form below.
            </p>

            {/* ✅ Support Form */}
            <form onSubmit={handleSubmit} className="supportForm">
                <div className="inputGroup">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="inputGroup">
                    <label>Issue Type:</label>
                    <select name="issueType" value={formData.issueType} onChange={handleChange}>
                        <option>General Inquiry</option>
                        <option>Technical Issue</option>
                        <option>Feedback</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="inputGroup">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Describe your issue or feedback..."
                    ></textarea>
                </div>

                {/* ✅ Submit Button with motion effects */}
                <motion.button 
                    type="submit" 
                    className="submitButton"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Submit
                </motion.button>
            </form>
        </motion.div>
    );
};

export default SupportForm;
