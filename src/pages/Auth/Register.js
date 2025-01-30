import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import motion from framer-motion
import { motion } from 'framer-motion'; 

// Import style files
import '../../assets/styles/RegisterPage.css';

// Import icons
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";

// Import sweetalert2
import Swal from 'sweetalert2';

const Register = () => {
    // حفظ البيانات المدخلة
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        city: '',
    });

    // تحديث البيانات عند الكتابة في الحقول
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // إرسال البيانات إلى API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // إرسال طلب POST إلى الـ API
            const response = await axios.post('https://api.example.com/register', formData);
            
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have been registered successfully!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Something went wrong!',
            });
        }
    };

    return (
        <motion.div
            className='RegisterPage'
            initial={{ opacity: 0 }} // Start with opacity 0
            animate={{ opacity: 1 }} // Animate to opacity 1
            transition={{ duration: 1 }} // Duration of the animation
        >
            <motion.h1
                className='text-4xl font-bold text-white shadow-sm mb-2'
                initial={{ y: -50, opacity: 0 }} // Start above and invisible
                animate={{ y: 0, opacity: 1 }} // Animate to original position and visible
                transition={{ delay: 0.5, duration: 1 }} // Delay and duration
            >
                Create Account
            </motion.h1>
            
            <div className='Regsiter_form'>
                <div className='RegisterFormInputs'>
                    <form onSubmit={handleSubmit}>
                        <div className='InputsNames flex justify-between gap-x-4'>
                            <motion.fieldset
                                className="border-2 border-orange-500 rounded-md px-2 py-2 mb-3 w-1/2"
                                whileHover={{ scale: 1.02 }} // Scale up on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                            >
                                <legend className="text-gray-400 text-sm font-bold px-3">F-name</legend>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                        onChange={handleChange}
                                    />
                                    <div>
                                        <FaRegUser className='text-2xl text-gray-400' />
                                    </div>
                                </div>
                            </motion.fieldset>
                            <motion.fieldset
                                className="border-2 border-orange-500 rounded-md px-2 py-2 mb-3 w-1/2"
                                whileHover={{ scale: 1.02 }} // Scale up on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                            >
                                <legend className="text-gray-400 text-sm font-bold px-3">L-name</legend>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                        onChange={handleChange}
                                    />
                                    <div>
                                        <FaRegUser className='text-2xl text-gray-400' />
                                    </div>
                                </div>
                            </motion.fieldset>
                        </div>
                        
                        <motion.fieldset
                            className="border-2 border-orange-500 rounded-md px-3 py-2 mb-3"
                            whileHover={{ scale: 1.02 }} // Scale up on hover
                            transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                        >
                            <legend className="text-gray-400 text-sm font-bold px-3">E-mail</legend>
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                    onChange={handleChange}
                                />
                                <div>
                                    <MdOutlineEmail className='text-2xl text-gray-400' />
                                </div>
                            </div>
                        </motion.fieldset>

                        <motion.fieldset
                            className="border-2 border-orange-500 rounded-md px-3 py-2 mb-3"
                            whileHover={{ scale: 1.02 }} // Scale up on hover
                            transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                        >
                            <legend className="text-gray-400 text-sm font-bold px-3">Password</legend>
                            <div className="flex items-center">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                    onChange={handleChange}
                                />
                                <div>
                                    <IoEyeOutline className='text-2xl text-gray-400' />
                                </div>
                            </div>
                        </motion.fieldset>

                        <motion.fieldset
                            className="border-2 border-orange-500 rounded-md px-3 py-2 mb-3"
                            whileHover={{ scale: 1.02 }} // Scale up on hover
                            transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                        >
                            <legend className="text-gray-400 text-sm font-bold px-3">P-NUM</legend>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Enter Your Phone Number"
                                    className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                    onChange={handleChange}
                                />
                                <div>
                                    <MdOutlineLocalPhone className='text-2xl text-gray-400' />
                                </div>
                            </div>
                        </motion.fieldset>

                        <div className='InputsNames flex justify-between gap-4'>
                            <motion.fieldset
                                className="border-2 border-orange-500 rounded-md px-2 py-2 mb-8 w-1/2"
                                whileHover={{ scale: 1.02 }} // Scale up on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                            >
                                <legend className="text-gray-400 text-sm font-bold px-3">Country</legend>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="country"
                                        className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                        onChange={handleChange}
                                    />
                                </div>
                            </motion.fieldset>
                            <motion.fieldset
                                className="border-2 border-orange-500 rounded-md px-2 py-2 mb-8 w-1/2"
                                whileHover={{ scale: 1.02 }} // Scale up on hover
                                transition={{ type: 'spring', stiffness: 300 }} // Spring animation
                            >
                                <legend className="text-gray-400 text-sm font-bold px-3">City</legend>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="city"
                                        className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                        onChange={handleChange}
                                    />
                                </div>
                            </motion.fieldset>
                        </div>

                        <motion.button
                            className="w-full inline-block rounded border border-orange-500 bg-orange-500 px-12 py-4 text-base font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring shadow-md text-center mt-3"
                            type='submit'
                            whileHover={{ scale: 1.05 }} // Scale up on hover
                            whileTap={{ scale: 0.95 }} // Scale down on click
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <motion.div
                        className="mt-8 h-1"
                        initial={{ opacity: 0, y: 50 }} // Start invisible and below
                        animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
                        transition={{ delay: 1, duration: 1 }} // Delay and duration
                    >
                        <p className="text-sm text-gray-600 font-bold">
                            Already Have Account?
                            <Link to='/login' className="text-sm text-orange-500 font-extrabold px-2">
                                Sign Up
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;