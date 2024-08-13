// src/components/DashboardHeader.tsx
import React from 'react';
import './HomeHeader.css';

function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h1>Welcome, Jack</h1>
        <p className="date">1 August 2024</p>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
    </div>
  );
}

export default DashboardHeader;
