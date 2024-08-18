import React, { useState } from 'react';
import './ProductHeader.css';

interface ProductHeaderProps {
  onAddProduct: (newProduct: any) => void;
  onSearch: (query: string) => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ onAddProduct, onSearch }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    sku: '',
    location: '',
    price: '',
    stock: 0,
    status: 'Ready Stock',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = () => {
    onAddProduct(newProduct);
    setIsAdding(false);
    setNewProduct({
      id: '',
      name: '',
      sku: '',
      location: '',
      price: '',
      stock: 0,
      status: 'Ready Stock',
      image: '',
    });
  };

  return (
    <header className="product-header">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="filters">
        <button
          className="add-item-button"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : 'Add Item +'}
        </button>
      </div>
      {isAdding && (
        <div className="add-product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={newProduct.sku}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newProduct.location}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
          <input type="file" name="image" onChange={handleImageChange} />
          <button onClick={handleSubmit}>Add Product</button>
        </div>
      )}
    </header>
  );
};

export default ProductHeader;
