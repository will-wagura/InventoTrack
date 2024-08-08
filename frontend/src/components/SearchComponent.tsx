import React from 'react';
import styles from '../styles/SearchComponent.module.css';

interface SearchComponentProps {}

const SearchComponent: React.FC<SearchComponentProps> = () => {
  return (
    <header className={styles.searchContainer}>
      <div className={styles.searchBox} role="search">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d1c4839d4bbb8eec83d234b847f9c2a02794f7a99cdcb2c150165a14c699afd?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" className={styles.searchIcon} alt="" />
        {/* <label htmlFor="searchInput" className={styles.visually-hidden}>Search</label> */}
        <input id="searchInput" type="text" className={styles.searchPlaceholder} placeholder="Search...." aria-label="Search" />
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/86dac638867b7236cbc788306e10346f25a15cd1a848932415c4d382f2176fba?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" className={styles.moreIcon} alt="More options" />
      <div className={styles.filterContainer}>
        <div className={styles.filterBox}>
          <div className={styles.filterText}>
            Filter : <span>No ID</span>
          </div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/82889fbbbf7b6a1be5879551c3b036e9d8df043da67a09b5275698aea0bb4897?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" className={styles.filterIcon} alt="" />
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ead8109a45e5b2876c971ec2d651ffe5c9b41cb5efe13bcee94845ec2f388467?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" className={styles.profileImage} alt="User profile" />
      </div>
    </header>
  );
};

export default SearchComponent;