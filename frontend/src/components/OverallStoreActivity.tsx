import React from 'react';
import styles from '../styles/OverallStoreActivity.module.css';

interface YAxisLabelProps {
  value: string;
  isLast?: boolean;
}

const YAxisLabel: React.FC<YAxisLabelProps> = ({ value, isLast }) => (
  <div className={`${styles.yAxisLabel} ${isLast ? styles.yAxisLabel : ''}`}>
    {value}
  </div>
);

const yAxisLabels = ['400k', '300k', '200k', '100k', '0'];
const xAxisLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const OverallStoreActivity: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Overall Store Activity</h2>
      <hr className={styles.divider} />
      <div className={styles.chartContainer}>
        <div className={styles.yAxis}>
          {yAxisLabels.map((label, index) => (
            <YAxisLabel
              key={label}
              value={label}
              isLast={index === yAxisLabels.length - 1}
            />
          ))}
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7fab9ccca95fb4df721484ed587bf7f6024e9f844d70777579d9c09ab0dbf80e?apiKey=517a1ef9e08f4882bae2f6abb0261afa&&apiKey=517a1ef9e08f4882bae2f6abb0261afa"
          alt="Chart showing overall store activity"
          className={styles.chartImage}
        />
      </div>
      <div className={styles.xAxis}>
        {xAxisLabels.map((label) => (
          <div key={label} className={styles.xAxisLabel}>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default OverallStoreActivity;