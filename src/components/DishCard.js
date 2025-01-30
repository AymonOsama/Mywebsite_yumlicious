import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const DishCard = ({ dish }) => {
    const { image, name, description, price, likes } = dish;
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeToggle = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="flex bg-gray-700 text-white rounded-lg shadow-2xl hover:shadow-xl transition-shadow duration-300 w-full max-w-md relative overflow-hidden h-44">
            {/* Image section */}
            <div className="w-1/3">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-l-lg transform hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Like icon */}
            <div
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                onClick={handleLikeToggle}
            >
                <AiFillHeart
                    className={`text-lg ${
                        isLiked ? "text-red-500 animate-pulse" : "text-gray-400"
                    } transition-colors duration-300`}
                />
                <span className="text-sm font-bold text-gray-700 ml-1">{likeCount}</span>
            </div>

            {/* Details section */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-2">{name}</h3>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-orange-500">{price} $</p>
                    <button className="bg-orange-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-orange-600 transition-colors duration-400 transform hover:scale-105 w-24 md:w-auto">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishCard;
