import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// import pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register'
import ForgetPassword from '../pages/Auth/ForgetPassword'
import HomePage from '../pages/HomePage'
import Menu from '../pages/Menu'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                {/* Route الخاص بكل صفحة */}

                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/forgot-password" element={<ForgetPassword />} />

                <Route path="/home" element={<HomePage />} />

                <Route path='/menu' element={<Menu />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
