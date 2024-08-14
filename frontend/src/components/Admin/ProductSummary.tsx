import React from 'react';
import './ProductSummary.css';

const ProductSummary: React.FC = () => {
  return (
    <div className="product-summary">
      <div className="product-image">
        <img src="path-to-image.jpg" alt="Product" />
      </div>
      <div className="product-details">
        <h2>1741D - Dollan Watch</h2>
        <p><strong>Stock:</strong> 1108 - Warehouse 1</p>
        <p><strong>Price:</strong> Ksh 1,230</p>
        <p><strong>Status:</strong> Ready Stock</p>
      </div>
    </div>
  );
};

export default ProductSummary;
