import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// Import style files
import '../../assets/styles/LoginPage.css';

// Import icons
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

// Import images
import logo from '../../assets/images/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theEmail = 'Aymanausama5@yahoo.com';
    const thePassword = '1973aaaa';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === theEmail && password === thePassword) {
            Swal.fire({
                title: 'Welcome Back!',
                text: 'Login Successful!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'Sucess-button',
                },
            }).then(() => {
                navigate('/home');
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Email or Password!',
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: {
                    confirmButton: 'inVaild-button',
                },
            });
        }
    };

    return (
        <motion.div
            className='LoginPage'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className='Login_Form px-32 py-16'>
                <motion.div
                    className='HeadOfLoginForm'
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p className='text-[1.4rem] text-gray-400 font-bold'>There’s some Great Discounts</p>
                    <p className='text-4xl text-gray-900 font-semibold py-4'>
                        sign up to <span className='text-gray-900 font-extrabold px-4'>Yumlicious</span>
                    </p>
                </motion.div>

                <div className='LoginFormInputs'>
                    <form onSubmit={handleSubmit} className="pt-16 pb-8 w-full max-w-md h-full">
                        <motion.fieldset
                            className="border-2 border-orange-500 rounded-md px-3 py-4 mb-8"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <legend className="text-gray-400 text-sm font-bold px-3">E-mail</legend>
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                />
                                <div>
                                    <MdOutlineEmail className='text-2xl text-gray-400'></MdOutlineEmail>
                                </div>
                            </div>
                        </motion.fieldset>

                        <motion.fieldset
                            className="border-2 border-orange-500 rounded-md px-3 py-4 mb-3"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <legend className="text-gray-400 text-sm font-bold px-3">Password</legend>
                            <div className="flex items-center">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    className="w-full border-none outline-none text-gray-600 py-1 px-2"
                                />
                                <div>
                                    <IoEyeOutline className='text-2xl text-gray-400'></IoEyeOutline>
                                </div>
                            </div>
                        </motion.fieldset>

                        <Link to='/forgot-password' className='text-sm text-gray-600 font-bold'>Forget Password?</Link>

                        <motion.button
                            className="w-full inline-block rounded border border-orange-500 bg-orange-500 px-12 py-4 text-base font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring shadow-md text-center mt-10"
                            type='submit'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>

                    <motion.div
                        className="absolute bottom-4 h-10 w-60 left-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <p className="text-sm text-gray-600 font-bold absolute bottom-0 left-0 mb-4">
                            Have No Account?
                            <Link to='/register' className="text-sm text-orange-500 font-extrabold px-2">
                                SIGN IN
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className='Login_About pl-10'>
                <motion.div
                    className='logo w-full flex justify-end items-center'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <img src={logo} alt="logo_yumlicious" className='w-44' />
                </motion.div>

                <motion.div
                    className='aboutInfo w-full py-8'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <p className='text-5xl mb-6 text-white font-semibold'>Welcome to</p>
                    <span className='font-extrabold text-6xl text-white'>Yumlicious</span>
                    <p style={{ letterSpacing: '0.1rem' }} className='mt-7 font-bold text-1xl text-white w-96'>Best Restaurant for Satisfying Your Cravings with Delicious Flavors</p>
                </motion.div>

                <motion.div
                    className='viewMenuBtn mt-10'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        className="inline-block rounded-2xl border-4 border-white px-6 py-3 text-sm font-bold text-white focus:outline-none transform transition-transform duration-300 hover:scale-105"
                        to='/menu'
                    >
                        view Menu
                    </Link>
                </motion.div>

                <motion.div
                    className='socialMediaIcons mt-20 mr-10 ml-10'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <div className='SocialMediaIconsHeader'>
                        <p style={{ letterSpacing: '0.1rem' }} className='text-white font-bold '>Follow US</p>
                    </div>
                    <div className='SocialMediaIconsSec my-12 flex justify-between'>
                        <a target='_blank' rel="noreferrer" href='https://www.facebook.com' className='text-2xl'><FaFacebook /></a>
                        <a target='_blank' rel="noreferrer" href='https://www.instagram.com' className='text-2xl'><FaSquareInstagram /></a>
                        <a target='_blank' rel="noreferrer" href='https://www.twitter.com' className='text-2xl'><FaTwitter /></a>
                        <a target='_blank' rel="noreferrer" href='https://www.telegram.com' className='text-2xl'><FaTelegramPlane /></a>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
