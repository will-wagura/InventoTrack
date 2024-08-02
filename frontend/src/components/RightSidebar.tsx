import React, { useState } from 'react';
import styles from '../styles/RightSidebar.module.css';

const RightSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Mike Thomson', message: 'Tell me later' },
    { id: 2, user: 'George Dose', message: 'Okay then. Tha...' },
    { id: 3, user: 'Lisa Moren', message: 'How long are n...' },
    { id: 4, user: 'Louise Robert', message: 'Trying' },
    { id: 5, user: 'Sandra Moses', message: 'I will. Thank\'s Ja...' },
  ]);

  const adminActivity = [
    { label: 'People Added', value: 130 },
    { label: 'Product Created', value: 263 },
    { label: 'UTM Created', value: 792 },
    { label: 'Email Sent (Campaign)', value: 1923 },
    { label: 'Content added', value: 103 },
    { label: 'Products Updated', value: 477 },
    { label: 'Reports Downloaded', value: 250 },
  ];

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
            <li key={msg.id}>
              <strong>{msg.user}</strong>
              <p>{msg.message}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.adminActivity}>
        <h3>Admin Activity</h3>
        <ul>
          {adminActivity.map((activity, index) => (
            <li key={index}>
              <span>{activity.label}</span>
              <span>{activity.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;