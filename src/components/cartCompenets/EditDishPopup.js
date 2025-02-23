import React from "react";
import { motion } from "framer-motion"; // ✅ استيراد framer-motion

// Import icons
import { FaPepperHot } from "react-icons/fa";

const EditDishPopup = ({ dish, onClose, onSave }) => {
    const [editedDish, setEditedDish] = React.useState({ ...dish });

    return (
        <>
            {/* ✅ الخلفية السوداء مع تأثير fade-in/fade-out */}
            <motion.div 
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* ✅ البوب أب مع تأثير الفتح والغلق السلس */}
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 px-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-xl font-bold mb-8">
                        Edit <span className="text-orange-500 pl-5 font-extrabold">{editedDish.name}</span>
                    </h2>

                    {/* تعديل الكمية */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-orange-500 font-extrabold">Quantity:</span>
                        <button 
                            className="bg-gray-300 px-2 py-1 rounded" 
                            onClick={() => setEditedDish({ ...editedDish, quantity: Math.max(1, editedDish.quantity - 1) })}
                        >-</button>
                        <span>{editedDish.quantity}</span>
                        <button 
                            className="bg-gray-300 px-2 py-1 rounded" 
                            onClick={() => setEditedDish({ ...editedDish, quantity: editedDish.quantity + 1 })}
                        >+</button>
                    </div>

                    {/* خيار "سبايسي" */}
                    <label className="flex items-center gap-2 pb-4">
                        <span className="text-orange-500 font-extrabold">Spicy</span>
                        <FaPepperHot className="text-2xl text-red-500"/>
                        <input 
                            type="checkbox" 
                            checked={editedDish.isSpicy} 
                            onChange={(e) => setEditedDish({ ...editedDish, isSpicy: e.target.checked })} 
                            className="ml-4"
                        />
                    </label>

                    {/* أزرار الحفظ والإلغاء */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
                            Cancel
                        </button>
                        <button 
                            className="bg-orange-500 text-white px-4 py-2 rounded-md"
                            onClick={() => onSave(editedDish)}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}; 

export default EditDishPopup;
