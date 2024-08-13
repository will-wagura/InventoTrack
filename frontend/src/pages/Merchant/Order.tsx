

import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  AreaChart, Area
} from 'recharts';
import "../../styles/Merchant/OrdersPage.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const orderStatusData = [
  { name: 'Pending', value: 30 },
  { name: 'Shipped', value: 45 },
  { name: 'Processing', value: 15 },
  { name: 'Delivered', value: 10 },
];

const paymentMethodData = [
  { name: 'Credit Card', value: 40 },
  { name: 'PayPal', value: 30 },
  { name: 'Bank Transfer', value: 20 },
  { name: 'CoD', value: 10 },
];

const monthlyOrdersData = [
  { name: 'Jan', orders: 65 },
  { name: 'Feb', orders: 59 },
  { name: 'Mar', orders: 80 },
  { name: 'Apr', orders: 81 },
  { name: 'May', orders: 56 },
  { name: 'Jun', orders: 55 },
];

const customerTypeData = [
  { name: 'New', value: 30 },
  { name: 'Returning', value: 70 },
];

const averageOrderValueData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 132 },
  { name: 'Mar', value: 101 },
  { name: 'Apr', value: 134 },
  { name: 'May', value: 90 },
  { name: 'Jun', value: 130 },
];

const Order: React.FC = () => {
  return (
    <div className="order">
       <header className="order-header">
                <h1>Order Analystics</h1>
            </header>
    <div className="order-page">
     
      
      <div className="chart-row">
        <div className="chart-container">
          <h2>Order Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {orderStatusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2>Payment Methods</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {paymentMethodData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-row">
        <div className="chart-container">
          <h2>Monthly Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2>Customer Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {customerTypeData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="chart-row">
        <div className="chart-container full-width">
          <h2>Average Order Value</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={averageOrderValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Order;
