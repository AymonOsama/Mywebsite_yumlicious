import { useState } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

// Style files
import '../assets/styles/Support.css';

// Import Components
import SideNavBar from "../components/SideNavBar";
import OurBranches from '../components/HomeCompenets/OurBranches';
import WorkingHours from '../components/HomeCompenets/WorkingHours';
import Footer from "../components/Footer";
import { FaPhoneAlt } from "react-icons/fa"; // ✅ Phone icon

const Support = () => {
    // ✅ State to handle form inputs
    const [formData, setFormData] = useState({
        phone: "",
        issueType: "General Inquiry",
        message: "",
    });

    // ✅ Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your request has been submitted!");
        console.log(formData);
        setFormData({ phone: "", issueType: "General Inquiry", message: "" });
    };

    // ✅ Scroll animation settings
    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div className="allSupportPage">
            {/* ✅ Sidebar Navigation */}
            <SideNavBar />

            <motion.div 
                className="mainSupportPage scroll-smooth px-4 my-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* ✅ Support Form Section with animation */}
                <motion.div 
                    className="supportContainer bg-[rgba(51,51,51,0.79)] px-6 md:px-10 py-7 rounded-2xl flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-white text-2xl font-semibold mb-4">Support & Help</h2>
                    <p className="text-white mb-6">
                        If you have any issues or suggestions, please fill out the form below.
                    </p>

                    {/* ✅ Support Form */}
                    <form onSubmit={handleSubmit} className="supportForm">
                        <div className="inputGroup">
                            <label>Phone Number:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="inputGroup">
                            <label>Issue Type:</label>
                            <select name="issueType" value={formData.issueType} onChange={handleChange}>
                                <option>General Inquiry</option>
                                <option>Technical Issue</option>
                                <option>Feedback</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="inputGroup">
                            <label>Message:</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Describe your issue or feedback..."
                            ></textarea>
                        </div>

                        {/* ✅ Submit Button with motion effects */}
                        <motion.button 
                            type="submit" 
                            className="submitButton"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Submit
                        </motion.button>
                    </form>
                </motion.div>

                {/* ✅ Call Us Section with animation */}
                <motion.div 
                    className="callUsContainer"
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h3 className="pb-10">Call Us</h3>
                    <ul className="flex justify-between items-center">
                        {/* ✅ Animate each phone number */}
                        {["+1 234 567 890", "+1 987 654 321", "+1 122 334 455"].map((phone, index) => (
                            <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                                className="flex items-center gap-2"
                            >
                                <FaPhoneAlt className="phoneIcon" />
                                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* ✅ Our Branches Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <OurBranches />
                </motion.div>

                {/* ✅ Working Hours Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <WorkingHours />
                </motion.div>

                {/* ✅ Footer Section */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Footer />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Support;
