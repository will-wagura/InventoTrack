// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import EmojiPicker from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { IoMdNotifications } from "react-icons/io";

// const socket = io('http://localhost:5000');

// interface Message {
//   sender: string;
//   time: string;
//   content: string;
//   read: boolean;
// }

// const ChatApp: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [activeChat, setActiveChat] = useState<string | null>(null);

//   useEffect(() => {
//     socket.on('message', (message: Message) => {
//       setMessages(prevMessages => [...prevMessages, message]);
//       toast.info('New message received!');
//     });
//   }, []);

//   const sendMessage = () => {
//     if (input.trim() && activeChat) {
//       const newMessage: Message = {
//         sender: 'You',
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         content: input,
//         read: true,
//       };
//       socket.emit('send_message', newMessage);
//       setMessages(prevMessages => [...prevMessages, newMessage]);
//       setInput('');
//     }
//   };

//   const openChat = (sender: string) => {
//     setActiveChat(sender);
//   };

//   return (
//     <div className="chat-app">
//       <div className="inbox-container">
//         <div className="inbox-header">
//           <input type="text" className="search-bar" placeholder="Search..." />
//           <div className="notification-bell">
//             <IoMdNotifications className="bell-icon" />
//           </div>
//         </div>
//         <div className="inbox">
//           <h3>Inbox</h3>
//           {messages.reduce((uniqueSenders, msg) => {
//             if (!uniqueSenders.some(sender => sender === msg.sender)) {
//               uniqueSenders.push(msg.sender);
//             }
//             return uniqueSenders;
//           }, [] as string[]).map((sender, index) => (
//             <div
//               className={`message ${activeChat === sender ? 'active' : ''}`}
//               key={index}
//               onClick={() => openChat(sender)}
//             >
//               <p><strong>{sender}</strong> <span>{messages.find(m => m.sender === sender)?.time}</span></p>
//               <p>{messages.find(m => m.sender === sender)?.content}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {activeChat && (
//         <div className="chat-box">
//           <h3>Chat with {activeChat}</h3>
//           <div className="chat-window">
//             {messages.filter(msg => msg.sender === activeChat || msg.sender === 'You').map((msg, idx) => (
//               <div key={idx} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
//                 <p><strong>{msg.sender}</strong> <span>{msg.time}</span></p>
//                 <p>{msg.content}</p>
//               </div>
//             ))}
//           </div>
//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message"
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//             />
//             <EmojiPicker onSelect={(emoji) => setInput(input + emoji.native)} />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default ChatApp;

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
            className={`message ${msg.read ? "read" : "unread"}`}
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
