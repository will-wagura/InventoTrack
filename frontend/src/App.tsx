import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './i18n'; // Import the i18n configuration
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; 
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import StatisticsPage from './pages/StatisticsPage';
import ManageUserPage from './pages/ManageUserPage';
import SettingPage from './pages/SettingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/manage-user" element={<ManageUserPage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

