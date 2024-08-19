import React, { useState } from 'react';
import './PaymentPage.css';
import PaymentHeader from '../../components/Admin/PaymentHeader';
import PaymentTable from '../../components/Admin/PaymentTable';
import PaymentPreviewProduct from '../../components/Admin/PaymentPreviewProduct';

interface Product {
  id: string;
  name: string;
  sku: string;
  merchant: string;
  status: string;
  qty: number;
  price: number;
  transactionId: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  paymentDate: string;
  dueDate: string;
  image: string;
}

const PaymentPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string | null>(null); // For filtering products
  const [view, setView] = useState<'list' | 'grid'>('list'); // For toggling between grid and list views

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleFilterChange = (filterStatus: string) => {
    setFilter(filterStatus);
  };

  const handleViewToggle = (newView: 'list' | 'grid') => {
    setView(newView);
  };

  // Hardcoded array of products
  const products = Array.from({ length: 10 }, (_, index) => ({
    id: `ID${index + 1}`,
    name: `Product ${index + 1}`,
    sku: `SKU${100000 + index}`,
    merchant: `Merchant ${index + 1}`,
    status: index % 2 === 0 ? 'Unpaid' : 'Paid',
    qty: (index + 1) * 10,
    price: 1230,
    transactionId: `TID${3872 + index}XG9`,
    totalAmount: 40000,
    paidAmount: 25000,
    dueAmount: 15000,
    paymentDate: '31-08-2024 14:56',
    dueDate: '31-09-2024 12:00',
    image: '/maize.png' // Ensure the image path is correct
  }));

  // Filter products based on the selected filter
  const filteredProducts = filter
    ? products.filter((product) => product.status === filter)
    : products;

  return (
    <div className="payment-page-container">
      <PaymentHeader onFilterChange={handleFilterChange} onToggleView={handleViewToggle} />
      <div className="payment-content">
        <PaymentTable products={filteredProducts} onProductClick={handleProductClick} view={view} />
        {selectedProduct && <PaymentPreviewProduct product={selectedProduct} />}
      </div>
    </div>
  );
};

export default PaymentPage;
