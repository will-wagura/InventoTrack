import React from 'react';
import styles from '../styles/AdminActivity.module.css';

interface ActivityItemProps {
  label: string;
  value: string | number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ label, value }) => (
  <>
    <div className={styles.activityLabels}>{label}</div>
    <div className={styles.activityValues}>{value}</div>
  </>
);

export default ActivityItem;
