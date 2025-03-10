import React from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

// Style files
import '../assets/styles/Support.css';

// import icons
import { FaPhoneAlt } from "react-icons/fa"; // ✅ Phone icon

// Import Components
import SideNavBar from "../components/SideNavBar";
import OurBranches from '../components/HomeCompenets/OurBranches';
import WorkingHours from '../components/HomeCompenets/WorkingHours';
import Footer from "../components/Footer";
import SupportForm from "../components/SupportComponents/SupportForm";

const Support = () => {

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
                {/* ✅ Call Us Section with animation */}
                <SupportForm/>
                
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
