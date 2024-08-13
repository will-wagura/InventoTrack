import React from 'react';
import DashboardHeader from '../components/HomeHeader';
import DashboardStats from '../components/DashboardStats';
import DashboardCharts from '../components/DashboardCharts';
import RecentOrder from '../components/RecentOrder';
import LowStock from '../components/LowStock';
import RightSection from '../components/RightSection';
import './HomePage.css'; // Import the CSS file

const HomePage: React.FC = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardStats />
      <DashboardCharts />
      <div className="main-container">
        <div className="left-column">
          <RecentOrder />
        </div>
        <div className="right-column">
          <LowStock />
        </div>
      </div>
      <RightSection />
    </>
  );
};

export default HomePage;
