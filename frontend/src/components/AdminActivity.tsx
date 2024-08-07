import React from 'react';
import styles from '../styles/AdminActivity.module.css';
import ActivityItem from './ActivityItem';

const activityData = [
  { label: 'People Added', value: 139 },
  { label: 'Product Created', value: 283 },
  { label: 'UTM Created', value: 782 },
  { label: 'Email Sent (Campaign)', value: 1923 },
  { label: 'Content added', value: 103 },
  { label: 'Products Updated', value: 477 },
  { label: 'Reports Downloaded', value: 280 },
];

const AdminActivity: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Admin Activity</h2>
      <hr className={styles.divider} />
      <div className={styles.activityList}>
        {activityData.map((item, index) => (
          <ActivityItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
};

export default AdminActivity;
