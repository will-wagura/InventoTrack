import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../styles/PaymentPage.css";

interface Product {
  id: number;
  name: string;
  sales: number[];
  stockLevels: number[];
  store: string;
}

const Payment: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Product A',
      sales: [100, 150, 200, 250, 300],
      stockLevels: [50, 45, 40, 35, 30],
      store: 'Store 1',
    },
    {
      id: 2,
      name: 'Product B',
      sales: [80, 130, 180, 230, 280],
      stockLevels: [60, 55, 50, 45, 40],
      store: 'Store 2',
    },
    // Add more products as needed
  ]);

  return (
    <div className="payment-page-container">
      <h2>Payment Metrics</h2>

      {products.map(product => (
        <div key={product.id} className="product-metrics">
          <h3>{product.name} - {product.store}</h3>
          <div className="metrics-overview">
            <div className="metric-chart">
              <h4>Sales Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={product.sales.map((sales, index) => ({ month: `M${index + 1}`, sales }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="metric-chart">
              <h4>Stock Levels Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={product.stockLevels.map((stock, index) => ({ month: `M${index + 1}`, stock }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="stock" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payment;
