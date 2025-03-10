// 📌P src/pages/ProfilePage.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import { motion } from "framer-motion";
import EditProfilePopup from "../components/SidenavBarCompenets/EditProfilePopup";

// Import Icons
import { FaEnvelope, FaPhone, FaGlobe, FaCity, FaUserShield, FaEdit } from "react-icons/fa";

// Import Images
import profilePlaceholder from "../assets/images/default.jpg";

// Import Styles
import '../assets/styles/ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!storedUser) {
            navigate("/login");
        } else {
            setUser(storedUser);
        }
    }, [navigate]);

    const handleEditProfile = async () => {
        const updatedData = await EditProfilePopup(user);
        if (updatedData) {
            const updatedUser = { ...user, ...updatedData };
            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center text-2xl text-white">
                Loading user data...
            </div>
        );
    }

    return (
        <div
            className="AllProfilePage"
        >
            {/* ✅ الشريط الجانبي */}
            <SideNavBar />

            {/* ✅ محتوى الصفحة */}
            <motion.div className="MainProfilePage flex flex-col flex-grow items-center justify-center p-8">
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl text-center"
                >
                    {/* ✅ صورة البروفايل + الاسم + أيقونة التعديل */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <img
                            src={user.profileImage || profilePlaceholder}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
                        />
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</p>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleEditProfile}>
                                <FaEdit className="text-xl" />
                            </button>
                        </div>
                    </motion.div>

                    {/* ✅ بيانات المستخدم */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.2 }}
                        className="text-gray-700 text-lg space-y-4"
                    >
                        {["email", "phone", "country", "city", "role"].map((field, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.4 + index * 0.1 } }}
                                className="flex items-center gap-4 bg-gray-100 p-3 rounded-lg shadow"
                            >
                                {field === "email" && <FaEnvelope className="text-2xl text-gray-600" />}
                                {field === "phone" && <FaPhone className="text-2xl text-gray-600" />}
                                {field === "country" && <FaGlobe className="text-2xl text-gray-600" />}
                                {field === "city" && <FaCity className="text-2xl text-gray-600" />}
                                {field === "role" && <FaUserShield className="text-2xl text-gray-600" />}
                                <p className="font-semibold">{user[field]}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;
