import React, { useState } from 'react';
import styles from '../styles/RightSidebar.module.css';
import AdminActivity from './AdminActivity';
import UserAvatar from './UserAvatar';
import UserProfile from './UserProfile';

const RightSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Mike Thomson', message: 'Tell me later', avatar: 'path/to/avatar1.png', time: '10:32 am', notifications: 4 },
    { id: 2, user: 'George Dose', message: 'Okay then. Tha...', avatar: 'path/to/avatar2.png', time: '09:17 am', notifications: 1 },
    { id: 3, user: 'Lisa Moren', message: 'How long are n...', avatar: 'path/to/avatar3.png', time: 'Yesterday', notifications: 2 },
    { id: 4, user: 'Louise Robert', message: 'Trying', avatar: 'path/to/avatar4.png', time: 'Yesterday', notifications: 1 },
    { id: 5, user: 'Sandra Moses', message: 'I will. Thank\'s Ja...', avatar: 'path/to/avatar5.png', time: 'Yesterday', notifications: 0 },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search functionality here
  };

  return (
    <aside className={styles.rightSidebar}>
      <UserProfile
        name="Jack Doe"
        role="Merchant"
        avatarSrc="path/to/user/avatar.png"
        iconSrc="path/to/icon.png"
      />
      <div className={styles.search}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.inbox}>
        <h3>Inbox</h3>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id} className={styles.messageItem}>
              <UserAvatar src={msg.avatar} alt={msg.user} />
              <div className={styles.messageContent}>
                <strong>{msg.user}</strong>
                <p>{msg.message}</p>
              </div>
              <span className={styles.time}>{msg.time}</span>
              {msg.notifications > 0 && <span className={styles.notifications}>{msg.notifications}</span>}
            </li>
          ))}
        </ul>
      </div>
      <AdminActivity />
    </aside>
  );
};

export default RightSidebar;
