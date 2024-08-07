// import React, { useState } from 'react';
// import styles from '../styles/MainContent.module.css';

// const MainContent: React.FC = () => {
//   const [stores, setStores] = useState([
//     { id: 1, name: 'Liby Store', branch: 'Kilimani Branch', address: '123 Main Street, City' },
//     { id: 2, name: 'Liby Store', branch: 'Ruaka Branch', address: '456 Elm Street, Town' },
//     { id: 3, name: 'Liby Store', branch: 'Kiamumbi Branch', address: '789 Oak Street, Village' },
//   ]);

//   const handleAddStore = () => {
//     const newStore = {
//       id: stores.length + 1,
//       name: 'New Store',
//       branch: 'New Branch',
//       address: 'New Address'
//     };
//     setStores([...stores, newStore]);
//   };

//   const handleEditStore = (id: number) => {
//     console.log('Editing store with id:', id);
//     // Implement edit functionality here
//   };

//   return (
//     <main className={styles.mainContent}>
//       <div className={styles.manageStore}>
//         <h2>Manage Store</h2>
//         <button className={styles.addStore} onClick={handleAddStore}>Add Store</button>
//       </div>
//       <div className={styles.storeList}>
//         {stores.map((store) => (
//           <div key={store.id} className={styles.storeItem}>
//             <div className={styles.shopLocal}>Shop local!</div>
//             <div>
//               <h3>{store.name}</h3>
//               <p>{store.branch}</p>
//               <p>{store.address}</p>
//             </div>
//             <button className={styles.editButton} onClick={() => handleEditStore(store.id)}>Edit</button>
//           </div>
//         ))}
//       </div>
//       <div className={styles.charts}>
//         <div className={styles.ordersChart}>
//           <h3>Orders</h3>
//           {/* Implement pie chart here */}
//         </div>
//         <div className={styles.activityChart}>
//           <h3>Overall Store Activity</h3>
//           {/* Implement line chart here */}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default MainContent;
import React, { useState } from 'react';
import styles from '../styles/MainContent.module.css';
import OrderStats from './OrderStats';
import OverallStoreActivity from './OverallStoreActivity';

const MainContent: React.FC = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Liby Store', branch: 'Kilimani Branch', address: '123 Main Street, City' },
    { id: 2, name: 'Liby Store', branch: 'Ruaka Branch', address: '456 Elm Street, Town' },
    { id: 3, name: 'Liby Store', branch: 'Kiamumbi Branch', address: '789 Oak Street, Village' },
  ]);

  const handleAddStore = () => {
    const newStore = {
      id: stores.length + 1,
      name: 'New Store',
      branch: 'New Branch',
      address: 'New Address'
    };
    setStores([...stores, newStore]);
  };

  const handleEditStore = (id: number) => {
    console.log('Editing store with id:', id);
    // Implement edit functionality here
  };

  return (
    <main className={styles.mainContent}>
      <div className={styles.manageStore}>
        <h2>Manage Store</h2>
        <button className={styles.addStore} onClick={handleAddStore}>Add Store</button>
      </div>
      <div className={styles.storeList}>
        {stores.map((store) => (
          <div key={store.id} className={styles.storeItem}>
            <div className={styles.shopLocal}>Shop local!</div>
            <div>
              <h3>{store.name}</h3>
              <p>{store.branch}</p>
              <p>{store.address}</p>
            </div>
            <button className={styles.editButton} onClick={() => handleEditStore(store.id)}>Edit</button>
          </div>
        ))}
      </div>
      <div className={styles.charts}>
        <div className={styles.ordersChart}>
          <OrderStats />
        </div>
        <div className={styles.activityChart}>
          <h3>Overall Store Activity</h3>
          {/* Implement line chart here */}
          <OverallStoreActivity/>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
