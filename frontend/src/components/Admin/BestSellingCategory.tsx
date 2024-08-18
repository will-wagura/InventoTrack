// BestSellingCategory.tsx
import React from 'react';
import './BestSellingCategory.css';

const BestSellingCategory: React.FC = () => {
  return (
    <div className="best-selling-category">
      <div className="category-header">
        <h5>Best selling category</h5>
      </div>
      <table className="category-table">
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
            <td className="increase-by">3.2%</td>
          </tr>
          <tr>
            <td>Instant Food</td>
            <td>Ksh 22,000</td>
            <td className="increase-by">2%</td>
          </tr>
          <tr>
            <td>Households</td>
            <td>Ksh 22,000</td>
            <td className="increase-by">1.5%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingCategory;
