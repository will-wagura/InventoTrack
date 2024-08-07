import React, { useState } from 'react';
import styles from '../styles/RightSidebar.module.css';
import AdminActivity from './AdminActivity';
import UserAvatar from './UserAvatar';

const RightSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Mike Thomson', message: 'Tell me later' },
    { id: 2, user: 'George Dose', message: 'Okay then. Tha...' },
    { id: 3, user: 'Lisa Moren', message: 'How long are n...' },
    { id: 4, user: 'Louise Robert', message: 'Trying' },
    { id: 5, user: 'Sandra Moses', message: 'I will. Thank\'s Ja...' },
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search functionality here
  };

  return (
    <aside className={styles.rightSidebar}>
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
        </li>
          ))}
        </ul>
      </div>
      <AdminActivity />
    </aside>
  );
};

export default RightSidebar;
