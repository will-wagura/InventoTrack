import React from 'react';
import './ProductHeader.css';

const ProductHeader: React.FC = () => {
  return (
    <header className="product-header">
      <input type="text" className="search-input" placeholder="Search..." />
      <div className="filters">
        <button className="filter-button">Best Seller</button>
        <button className="filter-button">Filter : No ID</button>
        <button className="add-item-button">Add Item +</button>
      </div>
    </header>
  );
};

export default ProductHeader;
