import React from 'react';
import './PaymentTable.css'; // Importing the specific CSS file for this component
import { FaEdit, FaCopy } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  sku: string;
  merchant: string;
  status: string;
  qty: number;
  image: string; // Include image property
}

interface PaymentTableProps {
  products: Product[];
  onProductClick: (product: Product) => void; // Callback to handle product clicks
}

const PaymentTable: React.FC<PaymentTableProps> = ({ products, onProductClick }) => {
  return (
    <table className="payment-table">
      <thead>
        <tr>
          <th>No ID</th>
          <th>Product</th>
          <th>SKU</th>
          <th>Merchant</th>
          <th>Status</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} onClick={() => onProductClick(product)}> {/* Pass clicked product */}
            <td>{product.id}</td>
            <td>
              <img src={product.image} alt={product.name} />
              {product.name}
            </td>
            <td>{product.sku}</td>
            <td>{product.merchant}</td>
            <td>{product.status}</td>
            <td>{product.qty}</td>
            <td>
              <button>
                <FaEdit />
              </button>
              <button>
                <FaCopy />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
