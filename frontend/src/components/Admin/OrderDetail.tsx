import React from 'react';
import './OrderDetail.css';

interface OrderDetailProps {
    selectedOrder: any;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ selectedOrder }) => {
    if (!selectedOrder) {
        return <div className="order-detail">Select an order to see details</div>;
    }

    return (
        <div className="order-detail">
            <h2>{selectedOrder.name}</h2>
            <p>Date: {selectedOrder.date}</p>
            <p>Status: {selectedOrder.status}</p>
            <img src={`/watch.png`} alt={selectedOrder.name} />
        </div>
    );
};

export default OrderDetail;
