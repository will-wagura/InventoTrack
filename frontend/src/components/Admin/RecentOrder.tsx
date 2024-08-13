// src/components/RecentOrder.tsx
import React from 'react';
import './RecentOrder.css';

function RecentOrder() {
  return (
    <div className="recent-order">
      <h3>Recent Order</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12563987563</td>
            <td>30/7/2023</td>
            <td>Lays</td>
            <td>Ksh 200</td>
            <td>Processing</td>
          </tr>
          <tr>
            <td>12563987563</td>
            <td>21/7/2023</td>
            <td>Cadbury Chocolate</td>
            <td>Ksh 150</td>
            <td>Delivered</td>
          </tr>
          <tr>
            <td>12563987563</td>
            <td>19/7/2023</td>
            <td>Digestive Biscuits</td>
            <td>Ksh 300</td>
            <td>Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrder;
