import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaReceipt, FaMoneyBill, FaChartLine, FaUsersCog, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        setActiveItem('home');
        break;
      case '/product':
        setActiveItem('product');
        break;
      case '/order':
        setActiveItem('order');
        break;
      case '/payment':
        setActiveItem('payment');
        break;
      case '/statistics':
        setActiveItem('statistics');
        break;
      case '/manage-user':
        setActiveItem('manage-user');
        break;
      case '/setting':
        setActiveItem('setting');
        break;
      default:
        setActiveItem('');
    }
  }, [location]);

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <img src="/logo.png" alt="InventoTrack Logo" />
        </div>
        <nav>
          <ul>
            <li className={activeItem === 'home' ? 'menuItem active' : 'menuItem'}>
              <Link to="/" onClick={() => setActiveItem('home')}>
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li className={activeItem === 'product' ? 'menuItem active' : 'menuItem'}>
              <Link to="/product" onClick={() => setActiveItem('product')}>
                <FaBoxOpen /> <span>Product</span>
              </Link>
            </li>
            <li className={activeItem === 'order' ? 'menuItem active' : 'menuItem'}>
              <Link to="/order" onClick={() => setActiveItem('order')}>
                <FaReceipt /> <span>Order</span>
              </Link>
            </li>
            <li className={activeItem === 'payment' ? 'menuItem active' : 'menuItem'}>
              <Link to="/payment" onClick={() => setActiveItem('payment')}>
                <FaMoneyBill /> <span>Payment</span>
              </Link>
            </li>
            <li className={activeItem === 'statistics' ? 'menuItem active' : 'menuItem'}>
              <Link to="/statistics" onClick={() => setActiveItem('statistics')}>
                <FaChartLine /> <span>Statistics</span>
              </Link>
            </li>
            <li className={activeItem === 'manage-user' ? 'menuItem active' : 'menuItem'}>
              <Link to="/manage-user" onClick={() => setActiveItem('manage-user')}>
                <FaUsersCog /> <span>Manage User</span>
              </Link>
            </li>
            <li className={activeItem === 'setting' ? 'menuItem active' : 'menuItem'}>
              <Link to="/setting" onClick={() => setActiveItem('setting')}>
                <FaCog /> <span>Setting</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="logout-container">
        <a href="/logout" className="logout">
          <FaSignOutAlt /> <span>Log Out</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
