

import React, { useState } from 'react';
import styles from '../styles/SearchComponent.module.css';
import HamburgerMenu from './HamburgerMenu';

interface SearchComponentProps {
  onAddAdmin: () => void;
  onManageAdmins: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onAddAdmin, onManageAdmins }) => {
  const [filter, setFilter] = useState('No ID');

  const toggleFilter = () => {
    setFilter(filter === 'No ID' ? 'With ID' : 'No ID');
  };

  return (
    <header className={styles.searchContainer}>
      <HamburgerMenu onAddAdmin={onAddAdmin} onManageAdmins={onManageAdmins} />
      
      <div className={styles.searchBox} role="search">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d1c4839d4bbb8eec83d234b847f9c2a02794f7a99cdcb2c150165a14c699afd?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" 
          className={styles.searchIcon} 
          alt="" 
        />
        <input 
          id="searchInput" 
          type="text" 
          className={styles.searchPlaceholder} 
          placeholder="Search...." 
          aria-label="Search" 
        />
      </div>

      <div className={styles.filterContainer}>
        <button className={styles.filterBox} onClick={toggleFilter}>
          <div className={styles.filterText}>
            Filter : <span>{filter}</span>
          </div>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/82889fbbbf7b6a1be5879551c3b036e9d8df043da67a09b5275698aea0bb4897?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" 
            className={styles.filterIcon} 
            alt="" 
          />
        </button>
        
      </div>
    </header>
  );
};

export default SearchComponent;