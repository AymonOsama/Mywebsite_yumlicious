// 📌 src/components/SideNavBar.js

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Import style files
import '../assets/styles/SideNavBar.css';

// Import images
import logo from '../assets/images/logo.png';

// Import icons
import { HiHome } from 'react-icons/hi';
import { MdMenuBook, MdOutlineShoppingCart } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

// Import components
import AdminDropdown from './SidenavBarCompenets/AdminDropdown';
import UserProfile from './SidenavBarCompenets/UserProfile';

const SideNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(storedUser);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* ✅ زر القائمة الجانبية (هامبرغر) يظهر فقط إذا كان عرض الشاشة أقل من 1280px */}
            <button
                className="close-btn fixed top-4 left-4 text-white text-3xl xl:hidden"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            {/* ✅ الشريط الجانبي */}
            <div
                className={`side-nav-bar h-full min-h-screen w-64 bg-gray-800 text-white flex flex-col items-center py-6 transition-transform duration-300 
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0 xl:relative`}
            >
                {/* ✅ الشعار */}
                <div className="logo mb-10">
                    <img src={logo} alt="Logo" className="w-5/12" />
                </div>

                {/* ✅ روابط التنقل */}
                <div className="nav-links flex flex-col gap-6 w-full">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${isActive ? 'bg-gray-600' : ''}`
                        }
                    >
                        <HiHome className="text-2xl" />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to="/menu"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${isActive ? 'bg-gray-600' : ''}`
                        }
                    >
                        <MdMenuBook className="text-2xl" />
                        <span>Menu</span>
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${isActive ? 'bg-gray-600' : ''}`
                        }
                    >
                        <MdOutlineShoppingCart className="text-2xl" />
                        <span>Cart</span>
                    </NavLink>
                    <NavLink
                        to="/support"
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-5 px-4 rounded-sm hover:bg-gray-600 ${isActive ? 'bg-gray-600' : ''}`
                        }
                    >
                        <FaPhoneAlt className="text-2xl" />
                        <span>Support</span>
                    </NavLink>

                    {/* ✅ القائمة المنسدلة للمسؤول */}
                    {user && user.role === 'admin' && <AdminDropdown />}
                </div>

                {/* ✅ استدعاء مكون UserProfile مع تمرير setUser */}
                <UserProfile user={user} setUser={setUser} />
            </div>
        </>
    );
};

export default SideNavBar;
