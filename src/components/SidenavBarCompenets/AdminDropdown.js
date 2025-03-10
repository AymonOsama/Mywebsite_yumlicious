import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // لاستخدام التنقل بين الصفحات

// Import icons
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // أيقونات السهم
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";


const AdminDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    // ✅ وظيفة لتبديل حالة القائمة المنسدلة
    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative w-full">
            {/* ✅ زر القائمة المنسدلة */}
            <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 py-5 px-4 rounded-sm text-white hover:bg-gray-600 w-full"
                type="button"
            >
                <RiAdminFill className="text-2xl" />
                <span>Admin Panel</span>
                {isOpen ? <AiOutlineUp className="ml-auto" /> : <AiOutlineDown className="ml-auto" />}
            </button>

            {/* ✅ القائمة المنسدلة */}
            {isOpen && (
                <div className="bg-gray-800 text-white flex flex-col w-full rounded-md shadow-lg">
                    <NavLink to="/ManageMenu" className=" flex justify-between items-center px-4 py-3 hover:bg-gray-600">
                        Manage Menu <MdEditSquare className="text-2xl"/>
                    </NavLink>
                    <NavLink to="/ManageEmployees" className="flex justify-between items-center px-4 py-3 hover:bg-gray-600">
                        Manage Employees <MdOutlineManageAccounts className="text-2xl"/>
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default AdminDropdown;
