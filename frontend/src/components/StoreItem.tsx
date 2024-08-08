import React from 'react';
import styles from '../styles/ManageStore.module.css';

interface StoreItemProps {
  storeName: string;
  branchName: string;
  address: string;
  phoneNumber: string;
  imageSrc: string;
}

const StoreItem: React.FC<StoreItemProps> = ({ storeName, branchName, address, phoneNumber, imageSrc }) => {
  return (
    <div className={styles.storeItem}>
      <div className={styles.storeItemContent}>
        <div className={styles.storeItemInfo}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img loading="lazy" src={imageSrc} alt={`${storeName} ${branchName}`} className={styles.storeImage} />
            </div>
          </div>
          <div className={styles.infoColumn}>
            <div className={styles.storeDetails}>
              <div className={styles.storeName}>{storeName}</div>
              <div className={styles.branchName}>{branchName}</div>
              <div className={styles.address}>
                {address}
                <br />
                {phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className={styles.editButton}>Edit</button>
    </div>
  );
};

export default StoreItem;