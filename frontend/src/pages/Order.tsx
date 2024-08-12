// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import "../styles/OrdersPage.css";

// interface Product {
//   id: number;
//   name: string;
//   store: string;
//   status: 'Paid' | 'Unpaid';
// }

// const Order: React.FC = () => {
//   const [products] = useState<Product[]>([
//     { id: 1, name: 'Product A', store: 'Store 1', status: 'Paid' },
//     { id: 2, name: 'Product B', store: 'Store 1', status: 'Unpaid' },
//     { id: 3, name: 'Product C', store: 'Store 2', status: 'Paid' },
//     { id: 4, name: 'Product D', store: 'Store 2', status: 'Unpaid' },
//     // Add more products
//   ]);

//   const stores = Array.from(new Set(products.map(product => product.store)));

//   return (
//     <div className="orders-page-container">
//       {stores.map(store => {
//         const storeProducts = products.filter(product => product.store === store);
//         const paidProducts = storeProducts.filter(product => product.status === 'Paid');
//         const unpaidProducts = storeProducts.filter(product => product.status === 'Unpaid');

//         const data = [
//           { name: 'Paid', value: paidProducts.length },
//           { name: 'Unpaid', value: unpaidProducts.length },
//         ];

//         return (
//           <div key={store} className="store-section">
//             <h3>{store}</h3>
//             <div className="overview">
//               <h4>Overview</h4>
//               <ResponsiveContainer width="50%" height={150}>
//                 <PieChart>
//                   <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={60}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     <Cell key="Paid" fill="#4CAF50" />
//                     <Cell key="Unpaid" fill="#F44336" />
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <div>
//                 <p>Total Products: {storeProducts.length}</p>
//                 <p>Paid: {paidProducts.length} ({((paidProducts.length / storeProducts.length) * 100).toFixed(1)}%)</p>
//                 <p>Unpaid: {unpaidProducts.length} ({((unpaidProducts.length / storeProducts.length) * 100).toFixed(1)}%)</p>
//               </div>
//             </div>

//             <div className="product-lists">
//               <div className="paid-products">
//                 <h4>Paid Products</h4>
//                 <ul>
//                   {paidProducts.map(product => (
//                     <li key={product.id}>{product.name}</li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="unpaid-products">
//                 <h4>Unpaid Products</h4>
//                 <ul>
//                   {unpaidProducts.map(product => (
//                     <li key={product.id}>{product.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Order;

import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  AreaChart, Area
} from 'recharts';
import "../styles/OrdersPage.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const orderStatusData = [
  { name: 'Pending', value: 30 },
  { name: 'P', value: 45 },
  { name: 'Shipped', value: 15 },
  { name: 'Deliver', value: 10 },
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
    <div className="order-page">
      <h1>Order Analytics</h1>
      
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
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {orderStatusData.map((entry, index) => (
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
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {paymentMethodData.map((entry, index) => (
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
                {customerTypeData.map((entry, index) => (
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
  );
};

export default Order;
