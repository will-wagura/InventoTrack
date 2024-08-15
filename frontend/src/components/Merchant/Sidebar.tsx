
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import styles from '../../styles/Sidebar.module.css';
// import {  FaChartLine } from 'react-icons/fa';
// import { FiHome, FiBriefcase } from "react-icons/fi";
// import { IoStorefrontOutline, IoFileTrayOutline  } from "react-icons/io5";
// // import { IoMdCard } from "react-icons/io";
// import { MdManageAccounts } from "react-icons/md";
// import { HiOutlineCog } from "react-icons/hi";

// const Sidebar: React.FC = () => {
//   const location = useLocation();
//   const [activeItem, setActiveItem] = useState('');
//   const menuItems = [
//     { icon: <FiHome />, name: 'Home', path: '/'},
//     { icon: <IoFileTrayOutline />, name: 'Products', path: '/products' },
//     { icon: <FiBriefcase />, name: 'Order', path: '/order' },
//     // { icon: <IoMdCard />, name: 'Payment', path: '/payment' },
//     { icon: <FaChartLine />, name: 'Statistic', path: '/statistic' },
//     { icon: <IoStorefrontOutline />, name: 'Manage Store', path: '/manage-store' },
//     { icon: <MdManageAccounts />, name: 'Manage Users', path: '/manage-users' },
//     { icon: <HiOutlineCog />, name: 'Settings', path: '/settings' },
//   ];

//   useEffect(() => {
//     const currentItem = menuItems.find(item => item.path === location.pathname);
//     if (currentItem) {
//       setActiveItem(currentItem.name);
//     }
//   }, [location]);


//   return (
//     <aside className={styles.sidebar}>
//       <div className={styles.logo}>
//         <img src="/src/assets/logo sidebar.png" alt="InventoTrack Logo" />
//       </div>
//       <nav>
//         <ul>
//           {menuItems.map((item, index) => (
//             <li key={index} className={styles.menuItem}>
//               <Link
//                 to={item.path}
//                 className={activeItem === item.name ? styles.active : ''}
//                 onClick={() => setActiveItem(item.name)}
//               >{item.icon}
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';
import { FaChartLine } from 'react-icons/fa';
import { FiHome, FiBriefcase } from "react-icons/fi";
import { IoStorefrontOutline, IoFileTrayOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineCog } from "react-icons/hi";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  // Define menu items based on user type or role
  const menuItems = [
    { icon: <FiHome />, name: 'Home', path: '/home' },
    { icon: <IoFileTrayOutline />, name: 'Products', path: '/products' },
    { icon: <FiBriefcase />, name: 'Order', path: '/order' },
    { icon: <FaChartLine />, name: 'Statistic', path: '/statistic' },
    { icon: <IoStorefrontOutline />, name: 'Manage Store', path: '/manage-store' },
    { icon: <MdManageAccounts />, name: 'Manage Users', path: '/manage-users' },
    { icon: <HiOutlineCog />, name: 'Settings', path: '/settings' },
  ];

  useEffect(() => {
    // Determine the active item based on the current path
    const currentItem = menuItems.find(item => location.pathname.includes(item.path));
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location, menuItems]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/src/assets/logo sidebar.png" alt="InventoTrack Logo" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={`${styles.menuItem} ${activeItem === item.name ? styles.active : ''}`}>
              <Link
                to={item.path}
                onClick={() => setActiveItem(item.name)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
