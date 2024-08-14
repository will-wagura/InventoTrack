import React from 'react';
import './PaymentPreviewProduct.css'; // Import the specific CSS file for styling

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
  image: string; // Added image property
}

interface PaymentPreviewProductProps {
  product: Product | null;
}

const PaymentPreviewProduct: React.FC<PaymentPreviewProductProps> = ({ product }) => {
  const placeholderImage = "/maize.png"; // Path to a placeholder image

  if (!product) {
    return <div className="preview-product">Select a product to see details.</div>;
  }

  return (
    <div className="preview-product">
      <img 
        src={product.image || placeholderImage} 
        alt={product.name} 
        className="product-image" 
      />
      <p><strong>{product.id}</strong> - {product.name}</p>
      <p><strong>Quantity:</strong> {product.qty}</p>
      <p><strong>Merchant:</strong> {product.merchant}</p>
      <p><strong>Price per Unit:</strong> Ksh {product.price}</p>
      <p><strong>Payment Status:</strong> {product.status}</p>
      <p><strong>Transaction ID:</strong> {product.transactionId}</p>
      <p><strong>Total Amount:</strong> Ksh {product.totalAmount}</p>
      <p><strong>Paid Amount:</strong> Ksh {product.paidAmount}</p>
      <p><strong>Amount Due:</strong> Ksh {product.dueAmount}</p>
      <p><strong>Payment Date:</strong> {product.paymentDate}</p>
      <p><strong>Due Date:</strong> {product.dueDate}</p>
    </div>
  );
};

export default PaymentPreviewProduct;
