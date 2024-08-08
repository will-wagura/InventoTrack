
// import React from 'react';
// import styles from '../styles/TopBar.module.css';
// import SearchComponent from './SearchComponent';

// const TopBar: React.FC = () => {
//   return (
//     <header className={styles.topBar}>
//       <SearchComponent />
//       <div className={styles.userProfile}>
//         <span>Jack Doe</span>
//         <img src="path_to_profile_image.jpg" alt="User" />
//       </div>
//     </header>
//   );
// };

// export default TopBar;

// components/TopBar.tsx
import React from 'react';
import SearchComponent from './SearchComponent';
import styles from '../styles/TopBar.module.css';

interface TopBarProps {
  onAddAdmin: () => void;
  onManageAdmins: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onAddAdmin, onManageAdmins }) => {
  return (
    <div className={styles.topBar}>
    <div className={styles.navbarContent}>
      <SearchComponent onAddAdmin={onAddAdmin} onManageAdmins={onManageAdmins} />
      {/* Add any additional top bar content here */}
    </div>
  </div>
  );
};

export default TopBar;