
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Manage Store');
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Order', path: '/order' },
    { name: 'Payment', path: '/payment' },
    { name: 'Statistic', path: '/statistic' },
    { name: 'Manage Store', path: '/manage-store' },
    { name: 'Manage Users', path: '/manage-users' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/src/assets/logo sidebar.png" alt="InventoTrack Logo" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <Link
                to={item.path}
                className={activeItem === item.name ? styles.active : ''}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

