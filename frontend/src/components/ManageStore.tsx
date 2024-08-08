import React from 'react';
import styles from '../styles/ManageStore.module.css';
import StoreItem from './StoreItem';

const storeData = [
  {
    storeName: "Lisy Store",
    branchName: "Kitisuru Branch",
    address: "1A/Krihnarajapuram, 3 rd street sulur",
    phoneNumber: "044- 653578",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbab44e88fb184d0159aaa9b26400bcba847c95f71e2ef6bd6636f5ecc65d475?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa"
  },
  {
    storeName: "Lisy Store",
    branchName: "Ruaka Branch",
    address: "54 Ramani colony, 3 rd street sulur",
    phoneNumber: "044- 653763",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbab44e88fb184d0159aaa9b26400bcba847c95f71e2ef6bd6636f5ecc65d475?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa"
  },
  {
    storeName: "Lisy Store",
    branchName: "Kitengela Branch",
    address: "32/ Venkatasamy layout, 3 rd street sulur",
    phoneNumber: "044- 653578",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dbab44e88fb184d0159aaa9b26400bcba847c95f71e2ef6bd6636f5ecc65d475?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa"
  }
];

const ManageStore: React.FC = () => {
  return (
    <section className={styles.manageStore}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.mainContent}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Manage Store</h1>
              <div className={styles.storeInfoWrapper}>
                <StoreItem {...storeData[0]} />
              </div>
            </div>
          </div>
          <div className={styles.actionColumn}>
            <div className={styles.actionButtons}>
              <button className={styles.addButton}>Add Store</button>
              <button className={styles.editButton}>Edit</button>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.storeList}>
        {storeData.slice(1).map((store, index) => (
          <StoreItem key={index} {...store} />
        ))}
      </main>
    </section>
  );
};

export default ManageStore;