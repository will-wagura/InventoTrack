// ProfitRevenueChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './ProfitRevenueChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfitRevenueChart: React.FC = () => {
  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Revenue',
        data: [30000, 40000, 60000, 50000, 45000, 55000, 70000],
        borderColor: '#20c997',
        backgroundColor: 'rgba(32, 201, 151, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Profit',
        data: [20000, 30000, 40000, 35000, 30000, 45000, 50000],
        borderColor: '#fd7e14',
        backgroundColor: 'rgba(253, 126, 20, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value: number | string) {
            return `Ksh ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="profit-revenue-chart">
      <div className="chart-header">
        <h4 className="chart-title">Profit & Revenue</h4>
        <button className="chart-toggle">Weekly</button>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProfitRevenueChart;
