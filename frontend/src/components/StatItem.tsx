import React from 'react';
import styles from '../styles/StatItem.module.css';

interface StatItemProps {
  value: string;
  label: string;
  isPaid: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, isPaid }) => {
  return (
    <div className={styles.statItem}>
      <div className={`${styles.statIndicator} ${isPaid ? styles.statIndicatorPaid : styles.statIndicatorUnpaid}`} />
      <div className={styles.statText}>
        <span className={styles.statValue}>{value}</span> {label}
      </div>
    </div>
  );
};

export default StatItem;
