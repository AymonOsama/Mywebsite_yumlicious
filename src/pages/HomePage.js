import React from 'react';
import { motion } from 'framer-motion';

// Import components
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
import OurBranches from '../components/HomeCompenets/OurBranches';
import WorkingHours from '../components/HomeCompenets/WorkingHours';
import WhoWeAre from '../components/HomeCompenets/WhoWeAre';
import TopDishes from '../components/HomeCompenets/TopDishes';
import Gallery from '../components/HomeCompenets/Gallery';

// Import styles
import '../assets/styles/HomePage.css';

const HomePage = () => {
    // ✅ Animation settings for scroll-in effect
    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <div className="AllPage">
            {/* ✅ Sidebar Navigation */}
            <SideNavBar />

            {/* ✅ Main Content Section */}
            <motion.div 
                className='HomePage scroll-smooth px-4 my-3'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {/* ✅ Gallery Section - Displays restaurant images */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={scrollVariants} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Gallery />
                </motion.div>

                {/* ✅ About Section - Brief introduction about the restaurant */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={scrollVariants} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <WhoWeAre />
                </motion.div>

                {/* ✅ Highest Rated Dishes - Displays top dishes with animations */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={scrollVariants} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <TopDishes />
                </motion.div>

                {/* ✅ Working Hours Section - Displays opening and closing times */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={scrollVariants} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <WorkingHours />
                </motion.div>

                {/* ✅ Our Branches Section - Displays restaurant locations */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    variants={scrollVariants} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <OurBranches />
                </motion.div>

                {/* ✅ Footer Section - Displays website footer */}
                <motion.div 
                    className='mt-12'
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
};

export default HomePage;
