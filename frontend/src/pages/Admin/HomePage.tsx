import React from 'react';
import DashboardHeader from '../../components/Admin/HomeHeader';
import DashboardStats from '../../components/Admin/DashboardStats';
import DashboardCharts from '../../components/Admin/DashboardCharts';
import RecentOrder from '../../components/Admin/RecentOrder';
import LowStock from '../../components/Admin/LowStock';
import RightSection from '../../components/RightSection';
import './HomePage.css';
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
