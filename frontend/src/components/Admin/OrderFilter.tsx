import React from 'react';
import './OrderFilter.css';

interface OrderFilterProps {
    onFilterChange: (criteria: string) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onFilterChange }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="order-filter-container">
            <select id="order-filter" onChange={handleFilterChange} className="order-filter-select">
                <option value="">Filter: All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
            </select>
        </div>
    );
};

export default OrderFilter;
