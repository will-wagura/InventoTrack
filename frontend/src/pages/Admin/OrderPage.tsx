import React, { useState, useEffect } from 'react';
import OrderList from '../../components/Admin/OrderList';
import OrderDetail from '../../components/Admin/OrderDetail';
import OrderFilter from '../../components/Admin/OrderFilter';
import './OrderPage.css';

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchedOrders = [
            { id: 1, name: 'Dollan Watch', date: '2024-08-10', status: 'Pending', image: 'watch.png' },
            { id: 2, name: 'Dollan Watch', date: '2024-08-09', status: 'Approved', image: 'watch.png' },
            { id: 3, name: 'Dollan Watch', date: '2024-08-08', status: 'Pending', image: 'watch.png' },
            { id: 4, name: 'Dollan Watch', date: '2024-08-07', status: 'Approved', image: 'watch.png' },
            { id: 5, name: 'Dollan Watch', date: '2024-08-06', status: 'Pending', image: 'watch.png' },
            { id: 6, name: 'Dollan Watch', date: '2024-08-05', status: 'Approved', image: 'watch.png' },
            { id: 7, name: 'Dollan Watch', date: '2024-08-04', status: 'Pending', image: 'watch.png' },
            { id: 8, name: 'Dollan Watch', date: '2024-08-03', status: 'Approved', image: 'watch.png' },
            { id: 9, name: 'Dollan Watch', date: '2024-08-02', status: 'Pending', image: 'watch.png' },
            { id: 10, name: 'Dollan Watch', date: '2024-08-01', status: 'Approved', image: 'watch.png' },
        ];
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders); // Initialize with all orders
    }, []);

    const handleFilterChange = (criteria: string) => {
        if (criteria === 'Approved') {
            const filtered = orders.filter(order => order.status === 'Approved');
            setFilteredOrders(filtered);
        } else if (criteria === 'Pending') {
            const filtered = orders.filter(order => order.status === 'Pending');
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders); // Show all if no specific criteria
        }
    };

    return (
        <div className="order-page-container">
            <OrderFilter onFilterChange={handleFilterChange} />
            <div className="order-content">
                <OrderList
                    orders={filteredOrders}
                    setSelectedOrder={setSelectedOrder}
                />
                <OrderDetail selectedOrder={selectedOrder} />
            </div>
        </div>
    );
};

export default OrderPage;
