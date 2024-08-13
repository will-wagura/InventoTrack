import React from "react";
import { IoMdNotifications } from "react-icons/io";

interface Message {
  sender: string;
  time: string;
  message: string;
  read: boolean;
}

const Inbox: React.FC = () => {
  const messages: Message[] = [
    {
      sender: "Mike Thomson",
      time: "10:32 am",
      message: "Tell me later",
      read: false,
    },
    {
      sender: "George Dose",
      time: "09:17 am",
      message: "Okey then. Thank...",
      read: true,
    },
    {
      sender: "Lisa Moren",
      time: "Yesterday",
      message: "How long the p...",
      read: true,
    },
    {
      sender: "Louise Robert",
      time: "Yesterday",
      message: "Typing...",
      read: true,
    },
    {
      sender: "Sandra Moses",
      time: "Yesterday",
      message: "I will. Thanks Ja...",
      read: true,
    },
  ];

  return (
    <div className="inbox-container">
         <div className="user-info">
          <img src="src/assets/people.png" alt="Profile" />
          <h5>
            <span className="name">Abdul</span>
            <br />
            <span className="title">Merchant</span>
          </h5>
          <div className="notification-bell">
          <IoMdNotifications className="bell-icon" />
        </div>
        </div>
      <div className="inbox-header">
     
        <input type="text" className="search-bar" placeholder="Search..." />
       
      </div>
      <div className="inbox">
        <h3>Inbox</h3>
        {messages.map((msg, index) => (
          <div
            className={message ${msg.read ? "read" : "unread"}}
            key={index}
          >
            <p>
              <strong>{msg.sender}</strong> <span>{msg.time}</span>
            </p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;