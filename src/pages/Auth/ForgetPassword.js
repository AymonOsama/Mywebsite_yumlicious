import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import motion from framer-motion
import { motion } from "framer-motion";

// import style files
import "../../assets/styles/ForgetPasswordPage.css";

// import icons
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

// import sweetalert2
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.example.com/forget-password",
        { email }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Please check your email for reset instructions.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Unable to send reset email!",
      });
    }
  };

  return (
    <motion.div
      className="ForgetPassPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-white shadow-sm mb-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Forget Password?
      </motion.h1>

      <motion.div
        className="ResetPass_form mb-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="HeadOfTheForm flex justify-between w-10/12 mt-0">
          <p className="text-1xl text-gray-600 font-bold">
            Forget Your Password?
          </p>
          <Link to="/login">
            <RiArrowGoBackLine className="text-2xl text-gray-600" />
          </Link>
        </div>

        <motion.div
          className="w-10/12 mt-12 mb-20"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-1xl text-gray-600 font-bold">
            No problem! Simply enter your email address below, and we'll send
            you a code to reset your password. Follow the instructions in the
            email to set up a new password and regain access to your account
          </p>
        </motion.div>

        <motion.fieldset
          className="border-2 border-orange-500 rounded-md px-3 py-2 mb-3 w-10/12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <legend className="text-gray-400 text-sm font-bold px-3">E-mail</legend>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Aymanusama5@yahoo.com"
              onChange={handleChange}
              className="w-full border-none outline-none text-gray-600 py-1 px-2"
            />
            <div>
              <MdOutlineEmail className="text-2xl text-gray-400"></MdOutlineEmail>
            </div>
          </div>
        </motion.fieldset>

        <motion.button
          className="inline-block rounded border border-orange-500 bg-orange-500 px-12 py-4 text-base font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring shadow-md text-center mt-32 w-10/12"
          type="submit"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ForgetPassword;
