import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Import style files
import '../assets/styles/SideNavBarCom.css';

// Import images
import logo from '../assets/images/logo.png';
import profilephoto from '../assets/images/463394806_900713062066252_7587263235661034460_n.jpg';

// Import icons
import { HiOutlineLogout } from 'react-icons/hi';
import { HiHome } from 'react-icons/hi';
import { MdMenuBook } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const SideNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                className="fixed z-50 text-3xl text-white top-3 left-3 md:hidden"
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
                <div className="user-profile mt-auto flex items-center gap-3 w-full px-4">
                    <img src={profilephoto} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                    <span className="flex-grow text-sm">Ayman Osama</span>
                    <Link to="/login" className="text-red-400 hover:text-red-500">
                        <HiOutlineLogout className="text-3xl" />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
