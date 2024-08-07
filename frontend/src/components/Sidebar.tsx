import React, { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Manage Store');
  const menuItems = ['Home', 'Product', 'Order', 'Payment', 'Statistic', 'Manage Store', 'Manage Users', 'Settings'];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/src/assets/logo sidebar.png" alt="InventoTrack Logo" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <a 
                href="#" 
                className={activeItem === item ? styles.active : ''}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
