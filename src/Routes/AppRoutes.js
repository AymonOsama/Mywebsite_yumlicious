import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Import pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import HomePage from '../pages/HomePage';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import SelectDilviryOptionPage from '../components/cartCompenets/SelectDilviryOptionPage';
import CheckOutPage from '../components/cartCompenets/CheckOutPage';
import Support from '../pages/Support';
// ✅ استدعاء الـ Context
import { CartProvider } from '../context/CartContext'; 

const AppRoutes = () => {
    return (
        <Router>
            <CartProvider>  {/* ✅ لف كل المشروع بـ CartProvider */}
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/DilviryOption" element={<SelectDilviryOptionPage />} />
                    <Route path='/checkout' element={<CheckOutPage/>}/>
                    <Route path='/support' element={<Support/>} />
                </Routes>
            </CartProvider>
        </Router>
    );
};

export default AppRoutes;
