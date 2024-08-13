import React from 'react';
import './ProductPreview.css'; // Ensure this path is correct

interface Product {
  id: string;
  name: string;
  image: string;
  stock: number;
  location: string;
  price: number;
  status: string;
}

interface ProductPreviewProps {
  product: Product;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ product }) => {
  return (
    <div className="product-preview">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.id} - {product.name}</h3>
      <p>Stock: {product.stock} - {product.location}</p>
      <p>Price: {product.price}</p>
      <p>Status: {product.status}</p>
    </div>
  );
};

export default ProductPreview;
