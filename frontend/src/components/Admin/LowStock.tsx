import React from 'react';
import './LowStock.css';

function LowStock() {
  return (
    <div className="low-stock">
      <h3>Low Quantity Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="tata-salt.png" alt="Tata Salt" className="product-image" />
              Tata Salt
            </td>
            <td>10 Packet</td>
          </tr>
          <tr>
            <td>
              <img src="lays.png" alt="Lays" className="product-image" />
              Lays
            </td>
            <td>15 Packet</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LowStock;
