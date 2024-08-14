// src/components/DashboardCharts.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './DashboardCharts.css';

const data = [
  { name: 'Jan', LastYear: 4000, RunningYear: 2400 },
  { name: 'Feb', LastYear: 3000, RunningYear: 1398 },
  // Add more data points
];

const pieData = [
  { name: 'E-commerce', value: 67 },
  { name: 'Website', value: 23 },
  { name: 'Offline store', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DashboardCharts = () => {
  return (
    <div className="dashboard-charts">
      <div className="chart">
        <h3>Overall Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="LastYear" stroke="#8884d8" />
            <Line type="monotone" dataKey="RunningYear" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <h3>Order Report</h3>
        <div className="pie-chart-container">
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                labelLine={false} 
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} 
                outerRadius="80%"
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
