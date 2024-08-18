import React, { useState } from 'react';
import './PaymentHeader.css';

interface PaymentHeaderProps {
  onFilterChange: (filterStatus: string) => void;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ onFilterChange }) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleFilterButtonClick = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterOptionClick = (status: string) => {
    onFilterChange(status);
    setShowFilterOptions(false);
  };

  return (
    <div className="payment-header">
      <input type="text" className="search-input" placeholder="Search..." />
      <div className="header-buttons">
        <button className="filter-button" onClick={handleFilterButtonClick}>
          Filter : No ID &#x25BC;
        </button>
        {showFilterOptions && (
          <div className="filter-options">
            <button onClick={() => handleFilterOptionClick('Paid')}>Paid</button>
            <button onClick={() => handleFilterOptionClick('Unpaid')}>Unpaid</button>
          </div>
        )}
        {/* Removed Add Item Button */}
        <button className="view-toggle-button">
          <div className="view-icon"></div>
        </button>
      </div>
    </div>
  );
};

export default PaymentHeader;

