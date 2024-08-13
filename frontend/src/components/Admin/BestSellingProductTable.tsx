// BestSellingProductTable.tsx
import React from 'react';
import './BestSellingProductTable.css';

const BestSellingProductTable: React.FC = () => {
  return (
    <div className="best-selling-product-table">
      <h4 className="product-table-title">Best Selling Product</h4>
      <table className="product-table">
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
            <td className="increase">2.3%</td>
          </tr>
          <tr>
            <td>Onion</td>
            <td>25831</td>
            <td>Vegetable</td>
            <td>200 kg</td>
            <td>Ksh 12,000</td>
            <td className="increase">1.3%</td>
          </tr>
          <tr>
            <td>Maggi</td>
            <td>56841</td>
            <td>Instant Food</td>
            <td>200 Packet</td>
            <td>Ksh 10,000</td>
            <td className="increase">1.3%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingProductTable;
