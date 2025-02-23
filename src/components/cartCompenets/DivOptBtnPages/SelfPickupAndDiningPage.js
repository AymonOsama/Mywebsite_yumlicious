import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

// إعدادات الخريطة
const mapContainerStyle = {
    width: "100%",
    height: "250px",
    borderRadius: "10px"
};

const center = {
    lat: 30.0444, // القاهرة
    lng: 31.2357
};

// قائمة المدن والمحلات
const cities = ["Cairo", "Alexandria", "Giza", "Sharm El-Sheikh"];
const stores = {
    Cairo: ["Store A", "Store B", "Store C"],
    Alexandria: ["Store X", "Store Y"],
    Giza: ["Store D", "Store E"],
    "Sharm El-Sheikh": ["Store Z"]
};

const SelfPickupAndDiningPage = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedStore, setSelectedStore] = useState("");

    return (
        <div className="h-auto flex items-center justify-center p-6">
            <div className="bg-[rgba(51,51,51,0.79)] p-6 md:p-10 rounded-lg shadow-md w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow-0">
                
                {/* 🗺️ خريطة الإحصائيات */}
                <div className="bg-white p-6 rounded-lg shadow-md flex-grow-0">
                    <h2 className="text-gray-800 text-lg font-bold mb-4">Sells by State</h2>

                    {/* ✅ تضمين خريطة Google */}
                    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={10}
                        >
                            <Marker position={center} />
                        </GoogleMap>
                    </LoadScript>

                    <p className="text-gray-500 text-sm mt-4">Last updated: 7 days ago</p>
                </div>

                {/* 🏠 نموذج إدخال العنوان (باستخدام الـ Dropdown) */}
                <div className="p-6 rounded-lg flex-grow-0">
                    <div className="grid grid-cols-1 gap-4">
                        {/* اختيار المدينة */}
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">City</label>
                            <select
                                className="w-full border border-orange-500 bg-orange-500 text-white rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400"
                                value={selectedCity}
                                onChange={(e) => {
                                    setSelectedCity(e.target.value);
                                    setSelectedStore(""); // إعادة تعيين المتجر عند تغيير المدينة
                                }}
                            >
                                <option value="">Select a City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* اختيار المتجر */}
                        <div>
                            <label className="block text-white text-sm font-bold mb-2">Store</label>
                            <select
                                className="w-full border border-orange-500 bg-orange-500 text-white rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400"
                                value={selectedStore}
                                onChange={(e) => setSelectedStore(e.target.value)}
                                disabled={!selectedCity}
                            >
                                <option value="">Select a Store</option>
                                {selectedCity &&
                                    stores[selectedCity].map((store, index) => (
                                        <option key={index} value={store}>
                                            {store}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/* ملاحظات إضافية */}
                    <div className="mt-4">
                        <label className="block text-white text-sm font-bold mb-2">Other Details</label>
                        <textarea className="w-full border border-orange-500 bg-white text-gray-800 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-500 h-20"></textarea>
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

export default SelfPickupAndDiningPage;
