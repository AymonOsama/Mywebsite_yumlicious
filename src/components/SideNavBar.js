import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Tooltip } from "react-tooltip";

// Import style files
import '../assets/styles/SideNavBarCom.css';

// Import images
import logo from '../assets/images/logo.png';
import profilephoto from '../assets/images/default.jpg';

// Import icons
import { HiOutlineLogout } from 'react-icons/hi';
import { HiHome } from 'react-icons/hi';
import { MdMenuBook } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const SideNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(storedUser);
    }, []);
    

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false); // أغلق القائمة إذا كان العرض أكبر من 768px
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
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
                localStorage.removeItem("loggedInUser"); // حذف بيانات المستخدم
                setUser(null); // تحديث الحالة
                navigate("/login"); // إعادة التوجيه لصفحة تسجيل الدخول
            }
        });
    };
    
    

    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                className="close-btn fixed top-4 left-4 text-white text-3xl md:hidden"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            {/* Navbar */}
            <div
                className={`side-nav-bar h-full min-h-screen w-64 bg-gray-800 text-white flex flex-col items-center py-6 transition-transform duration-300 ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:relative`}
            >
                {/* Logo */}
                <div className="logo mb-10">
                    <img src={logo} alt="Logo" className="w-5/12" />
                </div>

                {/* Navigation Links */}
                <div className="nav-links flex flex-col gap-6 w-full">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${
                                isActive ? 'bg-gray-600' : ''
                            }`
                        }
                    >
                        <HiHome className="text-2xl" />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${
                                isActive ? 'bg-gray-600' : ''
                            }`
                        }
                    >
                        <MdMenuBook className="text-2xl" />
                        <span>Menu</span>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${
                                isActive ? 'bg-gray-600' : ''
                            }`
                        }
                    >
                        <MdOutlineShoppingCart className="text-2xl" />
                        <span>Cart</span>
                    </NavLink>
                    <NavLink
                        to="/support"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${
                                isActive ? 'bg-gray-600' : ''
                            }`
                        }
                    >
                        <FaPhoneAlt className="text-2xl" />
                        <span>Support</span>
                    </NavLink>
                </div>

                {/* User Profile */}
                <div className="user-profile mt-auto flex items-center justify-between gap-4 w-full px-4">
                    <img 
                        src={user?.profilePic || profilephoto} 
                        alt="User" 
                        className="w-10 h-10 rounded-full border-2 border-white" 
                    />
                    <span className="flex-grow text-sm">
                        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
                    </span>
                    <button 
                        data-tooltip-id="logout-tooltip" 
                        data-tooltip-content="Log Out"
                        className="text-red-400 hover:text-red-500"
                        onClick={handleLogout}
                    >
                        <HiOutlineLogout className="text-3xl" />
                    </button>
                    <Tooltip id="logout-tooltip" place="top" effect="solid" delayShow={200} />
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
