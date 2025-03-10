// 📌 src/components/SidenavBarCompenets/UserProfile.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tooltip } from "react-tooltip";
import profilephoto from '../../assets/images/default.jpg';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

// Import Icons
import { HiOutlineLogout } from 'react-icons/hi';

const UserProfile = ({ user, setUser }) => {
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser && setUser) {
            setUser(storedUser);
        }
    }, [setUser]);

    const handleProfileClick = () => {
        if (!user || user.firstName === "Guest") {
            Swal.fire({
                title: "Access Denied",
                text: "You must log in first to access your profile.",
                icon: "warning",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/login");
            });
        } else {
            navigate("/profile");
        }
    };

    const handleLogout = () => {
        if (!user || user.firstName === "Guest") {
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("cart");
            setUser(null);
            navigate("/login");
            clearCart();
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to log out?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sure",
                cancelButtonText: "No",
                customClass: {
                    confirmButton: "Sucess-button",
                    cancelButton: "inVaild-button",
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("loggedInUser");
                    localStorage.removeItem("cart");
                    setUser(null);
                    navigate("/login");
                    clearCart();
                }
            });
        }
    };

    // ✅ التحقق من عدد الحروف في الاسم الكامل
    const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
    const displayedName = user?.firstName?.length + user?.lastName?.length > 7 
        ? user?.firstName 
        : fullName;

    return (
        <div className="mt-auto w-full flex items-center justify-between px-4 py-2 border-t border-gray-700">
            {/* ✅ الصورة + الاسم */}
            <div
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-md transition w-full md:w-auto"
                onClick={handleProfileClick}
                data-tooltip-id="profile-tooltip"
            >
                <img 
                    src={user?.profileImage || profilephoto} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-2 border-white" 
                />
                <span className="text-white text-sm md:text-base font-medium">
                    {displayedName}
                </span>
            </div>

            {/* ✅ Tooltip عند تمرير الماوس */}
            <Tooltip id="profile-tooltip" place="top" effect="solid" delayShow={200}>
                Your Profile
            </Tooltip>

            {/* ✅ زر تسجيل الخروج */}
            <button 
                data-tooltip-id="logout-tooltip" 
                data-tooltip-content="Log Out"
                className="text-red-400 hover:text-red-500 transition p-2 rounded-md"
                onClick={handleLogout}
            >
                <HiOutlineLogout className="text-2xl md:text-3xl" />
            </button>
            
            <Tooltip id="logout-tooltip" place="top" effect="solid" delayShow={200} />
        </div>
    );
};

export default UserProfile;
