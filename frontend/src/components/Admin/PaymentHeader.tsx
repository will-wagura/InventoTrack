import React from 'react';
import './PaymentHeader.css'; // Importing the specific CSS file for this component

const PaymentHeader: React.FC = () => {
  return (
    <div className="payment-header">
      <input type="text" className="search-input" placeholder="Search..." />
      <div className="header-buttons">
        <button className="filter-button">Filter : No ID &#x25BC;</button>
        <button className="add-item-button">Add Item +</button>
        <button className="view-toggle-button">
          <div className="view-icon"></div>
        </button>
      </div>
    </div>
  );
};

export default PaymentHeader;
