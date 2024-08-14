import { useState } from "react";
import "./inbox.css";

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      sender: "Mike Thomson",
      time: "10:32 am",
      message: "Tell me later",
      read: false,
    },
    {
      id: 2,
      sender: "George Dose",
      time: "09:17 am",
      message: "Okey then. Thank...",
      read: true,
    },
    {
      id: 3,
      sender: "Lisa Moren",
      time: "Yesterday",
      message: "How long the p...",
      read: true,
    },
    {
      id: 4,
      sender: "Louise Robert",
      time: "Yesterday",
      message: "Typing...",
      read: true,
    },
    {
      id: 5,
      sender: "Sandra Moses",
      time: "Yesterday",
      message: "I will. Thanks Ja...",
      read: true,
    },
  ];

  const handleMessageClick = (id: number) => {
    setSelectedMessage(id);
  };

  return (
    <div className="inbox">
      <h3>Inbox</h3>
      {messages.map((msg) => (
        <div
          className={`message ${msg.read ? "read" : "unread"} ${
            selectedMessage === msg.id ? "selected" : ""
          }`}
          key={msg.id}
          onClick={() => handleMessageClick(msg.id)}
        >
          <p>
            <strong>{msg.sender}</strong> <span>{msg.time}</span>
          </p>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
