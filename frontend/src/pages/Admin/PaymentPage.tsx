import React, { useState } from 'react';
import './PaymentPage.css';
import PaymentHeader from '../components/PaymentHeader';
import PaymentTable from '../components/PaymentTable';
import PaymentPreviewProduct from '../components/PaymentPreviewProduct';

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

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
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

  return (
    <div className="payment-page-container">
      <PaymentHeader />
      <div className="payment-content">
        <PaymentTable products={products} onProductClick={handleProductClick} />
        {selectedProduct && <PaymentPreviewProduct product={selectedProduct} />}
      </div>
    </div>
  );
};

export default PaymentPage;
