import React from 'react';
import styles from '../styles/OrderStats.module.css';
import StatItem from './StatItem';

const OrderStats: React.FC = () => {
  const stats = [
    { value: '40%', label: 'Pre Paid', isPaid: true },
    { value: '60%', label: 'Post Paid', isPaid: false }
  ];

  return (
    <section className={styles.container}>
      <div className={styles.statsWrapper}>
        <h2 className={styles.statsLabel}>Orders</h2>
        <p className={styles.statsValue}>1,302</p>
        <div className={styles.statsList}>
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} isPaid={stat.isPaid} />
          ))}
        </div>
      </div>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e0fcc1788f02fc63327faca292bb161971970eb5e24ec13d151528f938421e7?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa" 
        alt="Order statistics chart" 
        className={styles.statsImage} 
        loading="lazy"
      />
    </section>
  );
};

export default OrderStats;
