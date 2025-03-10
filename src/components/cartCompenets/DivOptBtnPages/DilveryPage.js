import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "250px",
    borderRadius: "10px"
};

const center = {
    lat: 30.0444, // القاهرة
    lng: 31.2357
};

const DeliveryPage = () => {
    // ✅ تحميل البيانات من `localStorage` إذا كانت موجودة
    const [formData, setFormData] = useState(() => {
        return JSON.parse(localStorage.getItem("deliveryAddress")) || {
            street: "",
            houseNumber: "",
            floorNumber: "",
            apartmentNumber: "",
            otherDetails: ""
        };
    });

    // ✅ حفظ البيانات عند أي تغيير في `formData`
    useEffect(() => {
        localStorage.setItem("deliveryAddress", JSON.stringify(formData));
    }, [formData]);

    // ✅ تحديث بيانات الإدخال عند تغييرها
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="h-auto flex items-center justify-center p-6">
            <div className="bg-[rgba(51,51,51,0.79)] p-6 md:p-10 rounded-lg shadow-md w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow-0">
                
                {/* 🗺️ خريطة Google */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow-0">
                    <h2 className="text-gray-800 text-lg font-bold mb-4">Sells by State</h2>
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>
                    <p className="text-gray-500 text-sm mt-4">Last updated: 7 days ago</p>
                </div>

                {/* 🏠 نموذج إدخال العنوان */}
                <div className="p-6 rounded-lg flex-grow-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">Name OF Street</label>
                            <input 
                                type="text" 
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">House Number</label>
                            <input 
                                type="text" 
                                name="houseNumber"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">Floor Number</label>
                            <input 
                                type="text" 
                                name="floorNumber"
                                value={formData.floorNumber}
                                onChange={handleChange}
                                className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">Apartment Number</label>
                            <input 
                                type="text" 
                                name="apartmentNumber"
                                value={formData.apartmentNumber}
                                onChange={handleChange}
                                className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-white text-sm font-bold mb-2">Other Details</label>
                        <textarea 
                            name="otherDetails"
                            value={formData.otherDetails}
                            onChange={handleChange}
                            className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500 h-20"
                        ></textarea>
                    </div>

                    {/* ✅ زر الـ Checkout */}
                    <div className="flex justify-end mt-6">
                        <Link to="/checkout">
                            <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-600 transition">
                                CheckOut
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DeliveryPage;
