import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Routes/AppRoutes'; // استيراد الروترات

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
