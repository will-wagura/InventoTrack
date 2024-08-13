import React from 'react';
import { IoMdNotifications } from "react-icons/io";
import './RightSection.css';

const RightSection = () => {
  const messages = [
    { sender: "Mike Thomson", time: "10:32 am", message: "Tell me later", read: false },
    { sender: "George Dose", time: "09:17 am", message: "Okey then. Thank...", read: true },
    { sender: "Lisa Moren", time: "Yesterday", message: "How long the p...", read: true },
    { sender: "Louise Robert", time: "Yesterday", message: "Typing...", read: true },
    { sender: "Sandra Moses", time: "Yesterday", message: "I will. Thanks Ja...", read: true },
  ];

  return (
    <div className="right-sidebar">
      <div className="user-info">
        <img src="avatar.jpg" alt="Profile" className="profile-picture" />
        <div className="user-details">
          <h3>Jack Doe</h3>
          <p className="user-role">Admin</p>
        </div>
        <div className="notification-bell">
          <IoMdNotifications className="bell-icon" />
        </div>
      </div>
      <input type="text" className="search-bar" placeholder="Search..." />
      <div className="inbox">
        <h3>Inbox</h3>
        {messages.map((msg, index) => (
          <div className={`message ${msg.read ? "read" : "unread"}`} key={index}>
            <p><strong>{msg.sender}</strong> <span>{msg.time}</span></p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="top-selling">
        <h4>Top Selling Product <span className="time-frame">1W</span></h4>
        <div className="product"><p>Dolan watch <span className="product-sale">365</span></p></div>
        <div className="product"><p>Sisy bag <span className="product-sale">135</span></p></div>
        <div className="product"><p>Path shoes <span className="product-sale">65</span></p></div>
        <div className="product"><p>Eagle bag <span className="product-sale">83</span></p></div>
        <div className="product"><p>Norlin pin <span className="product-sale">114</span></p></div>
        <div className="product"><p>Kiska tie <span className="product-sale">75</span></p></div>
        <div className="product"><p>Nora Bag <span className="product-sale">53</span></p></div>
      </div>
    </div>
  );
};

export default RightSection;
