// src/components/DashboardStats.tsx
import React from 'react';
import './DashboardStats.css';
<<<<<<< HEAD
// import totalSalesImg from '/sales_chart.png';
// import totalOrderImg from '/order_chart.png';
// import totalCustomerImg from '/customer_chart.png';
=======
import totalSalesImg from '/sales_chart.png';
import totalOrderImg from '/order_chart.png';
import totalCustomerImg from '/customer_chart.png';
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81

function DashboardStats() {
  return (
    <div className="dashboard-stats">
      <div className="stat">
<<<<<<< HEAD
        {/* <img src={totalSalesImg} alt="Total Sales" /> */}
=======
        <img src={totalSalesImg} alt="Total Sales" />
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81
        <div>
          <h3>Total Sales</h3>
          <p>Ksh 30,412</p>
          <span>1.5% vs last Month</span>
        </div>
      </div>
      <div className="stat">
<<<<<<< HEAD
        {/* <img src={totalOrderImg} alt="Total Order" /> */}
=======
        <img src={totalOrderImg} alt="Total Order" />
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81
        <div>
          <h3>Total Order</h3>
          <p>12,980</p>
          <span>0.7% vs last Month</span>
        </div>
      </div>
      <div className="stat">
<<<<<<< HEAD
        {/* <img src={totalCustomerImg} alt="Total Customer" /> */}
=======
        <img src={totalCustomerImg} alt="Total Customer" />
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81
        <div>
          <h3>Total Customer</h3>
          <p>2,753</p>
          <span>114 new customer vs last Month</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
