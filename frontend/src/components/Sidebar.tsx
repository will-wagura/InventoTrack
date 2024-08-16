import { useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../image/inventotrack-high-resolution-logo-transparent-top.png";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice'

interface Props {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}



const Sidebar: React.FC<Props> = ({ setActiveComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState("home");

  const handleSetActive = (component: string) => {
    setActiveItem(component);
    setActiveComponent(component);
  };



  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Optionally, wait for the logout action to complete
    // before navigating away. This is useful if logout involves async operations.

    // Navigate to login page
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="InventoTrack Logo" />
      </div>
      <nav>
        <ul>
          <li
            className={activeItem === "home" ? "menuItem active" : "menuItem"}
            onClick={() => {
              handleSetActive("home");
              navigate('merchant-dashboard');
            }}
          >
            <Link to="/merchant-dashboard">
              <FaHome /> <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={activeItem === "itemEntry" ? "menuItem active" : "menuItem"}
            onClick={() => {
              navigate('item-entry');
              handleSetActive("itemEntry");
            }}
          >
            <FaBoxOpen /> <span>Item Entry</span>
          </li>
          <li
            className={activeItem === "stockInfo" ? "menuItem active" : "menuItem"}
            onClick={() => {
              navigate('stock-information');
              handleSetActive("stockInfo");
            }}
          >
            <FaInfoCircle /> <span>Stock Information</span>
          </li>
          <li
            className={activeItem === "supplyRequests" ? "menuItem active" : "menuItem"}
            onClick={() => {
              navigate('supply-requests');
              handleSetActive("supplyRequests");
            }}
          >
            <FaClipboardList /> <span>Supply Requests</span>
          </li>
        </ul>
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        <h3>
          <FaSignOutAlt /> Log Out
        </h3>
      </button>
    </aside>
  );
};

export default Sidebar;