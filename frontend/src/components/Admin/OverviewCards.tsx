import React from 'react';
import './OverviewCard.css';

const OverviewCard = () => {
  return (
    <div className="overview-container">
      <h3 className="overview-header">Overview</h3>
      <div className="stat-container">
        <div className="stat-item">
          <div className="stat-value">Ksh 21,190</div>
          <div className="stat-label">Total Profit</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Ksh 18,300</div>
          <div className="stat-label revenue-label">Revenue</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Ksh 17,432</div>
          <div className="stat-label sales-label">Sales</div>
        </div>
      </div>
      <div className="stat-container">
        <div className="stat-item">
          <div className="stat-value">Ksh 1,170,432</div>
          <div className="stat-label">Net purchase value</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Ksh 80,432</div>
          <div className="stat-label">Net sales value</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Ksh 30,432</div>
          <div className="stat-label">MoM Profit</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Ksh 1,100,432</div>
          <div className="stat-label">YoY Profit</div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
