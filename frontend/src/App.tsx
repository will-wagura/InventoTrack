import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/Admin/HomePage'; 
import ProductPage from './pages/Admin/ProductPage';
import OrderPage from './pages/Admin/OrderPage';
import PaymentPage from './pages/Admin/PaymentPage';
import StatisticsPage from './pages/Admin/StatisticsPage';
import ManageUserPage from './pages/Admin/ManageUserPage';
import SettingPage from './pages/Admin/SettingPage';


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
        <Footer setActiveComponent={function (component: string): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    </Router>
  );
}

export default App;