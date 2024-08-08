import React, { useState } from 'react';
import styles from '../styles/HamburgerMenu.module.css';

interface HamburgerMenuProps {
  onAddAdmin: () => void;
  onManageAdmins: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onAddAdmin, onManageAdmins }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.hamburgerContainer}>
      <button onClick={toggleMenu} className={styles.hamburgerButton}>
        ☰
      </button>
      {isOpen && (
        <div className={styles.menuItems}>
          <button onClick={onAddAdmin}>Add New Admin</button>
          <button onClick={onManageAdmins}>Manage Admins</button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;