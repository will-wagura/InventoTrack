import React from 'react';
import './OrderList.css';

interface OrderListProps {
    orders: any[];
    setSelectedOrder: (order: any) => void;
    onEditOrder: (order: any) => void;
    onDeleteOrder: (orderId: number) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, setSelectedOrder, onEditOrder, onDeleteOrder }) => {
    return (
        <div className="order-list">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="order-item"
                    onClick={() => setSelectedOrder(order)}
                >
                    <img
                        src={`/watch.png`}
                        alt={order.name}
                        className="order-item-image"
                    />
                    <div className="order-item-text">
                        <h3>{order.name}</h3>
                        <p>{order.date}</p>
                        <p>Status: {order.status}</p>
                    </div>
                    <div className="order-item-actions">
                        <button
                            className="order-edit-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditOrder(order);
                            }}
                        >
                            ✏️
                        </button>
                        <button
                            className="order-delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteOrder(order.id);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
