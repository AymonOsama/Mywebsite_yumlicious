import React from "react";

// import icons
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

// import images
import logo from "../assets/images/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[rgba(51,51,51,0.79)] text-white py-4 px-6 rounded-t-sm">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo and Text */}
                <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                    <img src={logo} className="w-20" alt="Logo" />
                    <p className="text-sm">
                        &copy; 2025 Yumlicious — <span className="text-orange-500">@AymanOsama</span>
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="flex gap-4 justify-center md:justify-end">
                    <a href="#" className="text-white hover:text-orange-500 transition text-xl">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="text-white hover:text-orange-500 transition text-xl">
                        <FaTwitter />
                    </a>
                    <a href="#" className="text-white hover:text-orange-500 transition text-xl">
                        <FaYoutube />
                    </a>
                    <a href="#" className="text-white hover:text-orange-500 transition text-xl">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
