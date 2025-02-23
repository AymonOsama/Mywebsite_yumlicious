import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

// import components
import SideNavBar from '../components/SideNavBar';
import DishCard from '../components/DishCard';
import Footer from '../components/Footer';
import OurBranches from '../components/HomeCompenets/OurBranches';
import WorkingHours from '../components/HomeCompenets/WorkingHours';
import WhoWeAre from '../components/HomeCompenets/WhoWeAre';
import { CartContext } from "../context/CartContext"

// import style files
import '../assets/styles/HomePage.css';

// import images
import image1 from '../assets/images/res_1.jpg';
import image2 from '../assets/images/res_2.jpeg';
import image3 from '../assets/images/res_3.jpeg';

const HomePage = () => {
    const images = [image1, image2, image3];
    const [currentImage, setCurrentImage] = useState(0);
    const [dishes, setDishes] = useState([]);
    const [currentDishIndex, setCurrentDishIndex] = useState(0);
    const getStoredLikes = () => JSON.parse(localStorage.getItem("likedDishes")) || {};
    const [likedDishes, setLikedDishes] = useState(getStoredLikes);
    const { addToCart } = useContext(CartContext);  // ✅ جلب دالة الإضافة

    // Fetch dishes from JSON file
    useEffect(() => {
        fetch('/Data/dishesData.json')
            .then((response) => response.json())
            .then((data) => {
                const sortedDishes = data.sort((a, b) => b.likes - a.likes).slice(0, 6);
                setDishes(sortedDishes);
            })
            .catch((error) => console.error('Error loading dishes:', error));
    }, []);

    // Pagination for dishes
    const nextDish = () => {
        if (currentDishIndex < dishes.length - 1) {
            setCurrentDishIndex(currentDishIndex + 1);
        }
    };

    const previousDish = () => {
        if (currentDishIndex > 0) {
            setCurrentDishIndex(currentDishIndex - 1);
        }
    };

    const handlePageClick = (index) => {
        setCurrentImage(index);
    };

    const nextBtn = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        }
    };

    const previousBtn = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        }
    };

    // Animation variants for on-scroll
    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const handleLikeToggle = (id) => {
        setLikedDishes((prevLikes) => {
            const newLikes = { ...prevLikes, [id]: !prevLikes[id] };
            localStorage.setItem("likedDishes", JSON.stringify(newLikes));
            return newLikes;
        });

        setDishes((prevDishes) =>
            prevDishes.map((dish) =>
                dish.id === id
                    ? { ...dish, likes: likedDishes[id] ? dish.likes - 1 : dish.likes + 1 }
                    : dish
            )
        );
    }

    return (
        <motion.div
            className="AllPage max-w-screen overflow-x-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <SideNavBar />

            <motion.div className="TheHomePage mt-4 mx-4 mb-4 w-full max-w-screen overflow-x-hidden">
                {/* Gallery Section */}
                <motion.div
                    className="galeryResSec bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-7 rounded-2xl flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="text-section">
                        <p className="text-white text-2xl md:text-4xl font-bold">Yumlicious</p>
                        <p className="text-white text-sm md:text-1xl font-semibold mt-2">
                            Healthy food to live a healthier life in the future
                        </p>
                    </div>

                    <motion.div
                        className="content-section flex flex-col items-center"
                        initial="hidden"
                        whileInView="visible"
                        variants={scrollVariants}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <img
                            src={images[currentImage]}
                            className="w-full md:w-7/12 h-auto md:h-72 rounded-lg mt-6 md:mt-10 mb-6 md:mb-10"
                            alt="Restaurant"
                        />

                        <nav aria-label="Page navigation example" className="justify-center">
                            <ul className="inline-flex -space-x-px text-sm md:text-base">
                                <li>
                                    <button
                                        className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                                        onClick={previousBtn}
                                    >
                                        &lt;
                                    </button>
                                </li>
                                {images.map((_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handlePageClick(index)}
                                            className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight ${
                                                currentImage === index
                                                    ? 'bg-orange-500 text-white'
                                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-orange-500 hover:text-white'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                                        onClick={nextBtn}
                                    >
                                        &gt;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </motion.div>
                </motion.div>


                {/* About Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <WhoWeAre />
                </motion.div>


                {/* Highest Rated Dishes Section */}
                <motion.div
                    className="ratedDiches bg-[rgba(51,51,51,0.79)] px-4 md:px-10 py-7 rounded-2xl flex flex-col items-center justify-center mt-6 md:mt-12"
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-white text-xl md:text-2xl font-bold mb-8 md:mb-16">Our Highest Rated Dishes</p>

                    <div className="flex justify-center w-full">
                    {dishes.length > 0 ? (
                    <DishCard 
                        dish={dishes[currentDishIndex]} 
                        isLiked={!!likedDishes[dishes[currentDishIndex]?.id]}
                        onLikeToggle={() => handleLikeToggle(dishes[currentDishIndex]?.id)}
                        onAddToCart={() => addToCart(dishes[currentDishIndex])}  // ✅ تمرير دالة الإضافة
                    />
                ) : (
                    <p className="text-white">Loading...</p>
                )}
                    </div>
                    <nav aria-label="Page navigation example" className="mt-6 md:mt-10">
                <ul className="inline-flex -space-x-px text-sm md:text-base">
                    <li>
                        <button
                            className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                            onClick={previousDish}
                        >
                            &lt;
                        </button>
                    </li>
                    {dishes.map((_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setCurrentDishIndex(index)}
                                className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight ${
                                    currentDishIndex === index
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-orange-500 hover:text-white'
                                }`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-orange-500 hover:text-white cursor-pointer select-none"
                            onClick={nextDish}
                        >
                            &gt;
                        </button>
                    </li>
                </ul>
                            </nav>
                        </motion.div>


                {/* قسم االفروع */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <OurBranches />
                </motion.div>


                {/* قسم ساعات العمل */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollVariants}
                    viewport={{ once: true, amount: 0.3 }}
                >
                <WorkingHours/>
                </motion.div>


                {/* الفوتر  */}
                <Footer className="w-full" />
            </motion.div>
        </motion.div>
    );
};

export default HomePage;
