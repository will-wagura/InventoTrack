import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import "../styles/OrdersPage.css";

interface Product {
  id: number;
  name: string;
  store: string;
  status: 'Paid' | 'Unpaid';
}

const Order: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Product A', store: 'Store 1', status: 'Paid' },
    { id: 2, name: 'Product B', store: 'Store 1', status: 'Unpaid' },
    { id: 3, name: 'Product C', store: 'Store 2', status: 'Paid' },
    { id: 4, name: 'Product D', store: 'Store 2', status: 'Unpaid' },
    // Add more products
  ]);

  const stores = Array.from(new Set(products.map(product => product.store)));

  return (
    <div className="orders-page-container">
      {stores.map(store => {
        const storeProducts = products.filter(product => product.store === store);
        const paidProducts = storeProducts.filter(product => product.status === 'Paid');
        const unpaidProducts = storeProducts.filter(product => product.status === 'Unpaid');

        const data = [
          { name: 'Paid', value: paidProducts.length },
          { name: 'Unpaid', value: unpaidProducts.length },
        ];

        return (
          <div key={store} className="store-section">
            <h3>{store}</h3>
            <div className="overview">
              <h4>Overview</h4>
              <ResponsiveContainer width="50%" height={150}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell key="Paid" fill="#4CAF50" />
                    <Cell key="Unpaid" fill="#F44336" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div>
                <p>Total Products: {storeProducts.length}</p>
                <p>Paid: {paidProducts.length} ({((paidProducts.length / storeProducts.length) * 100).toFixed(1)}%)</p>
                <p>Unpaid: {unpaidProducts.length} ({((unpaidProducts.length / storeProducts.length) * 100).toFixed(1)}%)</p>
              </div>
            </div>

            <div className="product-lists">
              <div className="paid-products">
                <h4>Paid Products</h4>
                <ul>
                  {paidProducts.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
              <div className="unpaid-products">
                <h4>Unpaid Products</h4>
                <ul>
                  {unpaidProducts.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
