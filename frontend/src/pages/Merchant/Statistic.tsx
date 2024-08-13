import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import "../../styles/Merchant/StatisticPage.css";

const data = [
  { name: 'Sep', revenue: 40000, profit: 24000 },
  { name: 'Oct', revenue: 30000, profit: 13980 },
  { name: 'Nov', revenue: 50000, profit: 24000 },
  { name: 'Dec', revenue: 70000, profit: 39080 },
  { name: 'Jan', revenue: 60000, profit: 30000 },
  { name: 'Feb', revenue: 40000, profit: 20000 },
  { name: 'Mar', revenue: 30000, profit: 14000 },
];

const Statistics: React.FC = () => {
  return (
    <div className="statistics">
       <header className="statistics-header">
                <h1>Overview</h1>
            </header>
    <div className="statistics-content">
       
      
      <div className="overview-section">
        <div className="overview-card">
          <h4>Total Profit</h4>
          <p>Ksh 21,190</p>
        </div>
        <div className="overview-card">
          <h4>Revenue</h4>
          <p>Ksh 18,300</p>
        </div>
        <div className="overview-card">
          <h4>Sales</h4>
          <p>Ksh 17,432</p>
        </div>
        <div className="overview-card">
          <h4>Net Purchase Value</h4>
          <p>Ksh 1,170,432</p>
        </div>
        <div className="overview-card">
          <h4>Net Sales Value</h4>
          <p>Ksh 80,432</p>
        </div>
        <div className="overview-card">
          <h4>MoM Profit</h4>
          <p>Ksh 30,432</p>
        </div>
        <div className="overview-card">
          <h4>YoY Profit</h4>
          <p>Ksh 1,100,432</p>
        </div>
      </div>

      <div className="profit-revenue-chart">
        <h4>Profit & Revenue</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="profit" stroke="#82ca9d" fillOpacity={1} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="best-selling-category">
        <h4>Best Selling Category</h4>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Turn Over</th>
              <th>Increase By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vegetable</td>
              <td>Ksh 26,000</td>
              <td style={{ color: '#00bfa5' }}>3.2%</td>
            </tr>
            <tr>
              <td>Instant Food</td>
              <td>Ksh 22,000</td>
              <td style={{ color: '#00bfa5' }}>2%</td>
            </tr>
            <tr>
              <td>Households</td>
              <td>Ksh 22,000</td>
              <td style={{ color: '#00bfa5' }}>1.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
   

      <div className="best-selling-product">
        <h4>Best Selling Product</h4>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product ID</th>
              <th>Category</th>
              <th>Remaining Quantity</th>
              <th>Turn Over</th>
              <th>Increase By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tomato</td>
              <td>23567</td>
              <td>Vegetable</td>
              <td>225 kg</td>
              <td>Ksh 17,000</td>
              <td style={{ color: '#00bfa5' }}>2.3%</td>
            </tr>
            <tr>
              <td>Onion</td>
              <td>25831</td>
              <td>Vegetable</td>
              <td>200 kg</td>
              <td>Ksh 12,000</td>
              <td style={{ color: '#00bfa5' }}>1.3%</td>
            </tr>
            <tr>
              <td>Maggid</td>
              <td>56841</td>
              <td>Instant Food</td>
              <td>200 Packet</td>
              <td>Ksh 10,000</td>
              <td style={{ color: '#00bfa5' }}>1%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Statistics;
