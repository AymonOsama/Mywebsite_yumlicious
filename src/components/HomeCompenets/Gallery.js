import React, { useState } from "react";
import { motion } from "framer-motion";

// import images
import image1 from '../../assets/images/res_1.jpg';
import image2 from '../../assets/images/res_2.jpeg';
import image3 from '../../assets/images/res_3.jpeg';

const Gallery = ({ scrollVariants }) => {
    const images = [image1, image2, image3];
    const [currentImage, setCurrentImage] = useState(0);

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

    return (
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
                                            ? "bg-orange-500 text-white"
                                            : "text-gray-700 bg-white border border-gray-300 hover:bg-orange-500 hover:text-white"
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
    );
};

export default Gallery;
