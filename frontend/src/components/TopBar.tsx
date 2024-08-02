import React, { useState } from 'react';
import styles from '../styles/TopBar.module.css';

const TopBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Implement actual search functionality here
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.search}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Filter</button>
      </div>
      <div className={styles.userProfile}>
        <span>Jack Doe</span>
        <img src="path_to_profile_image.jpg" alt="User" />
      </div>
    </header>
  );
};

export default TopBar;