import React, { useState } from 'react';
import './ProductPage.css';
import ProductHeader from '../../components/Admin/ProductHeader';
import ProductList from '../../components/Admin/ProductList';
import ProductDetailsPreview from '../../components/Admin/ProductPreview';

const ProductPage: React.FC = () => {
  const initialProducts = [
    {
      id: '1741D',
      name: 'Dollan Watch 1',
      sku: '12569756',
      location: 'Warehouse 1',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1742D',
      name: 'Dollan Watch 2',
      sku: '12569757',
      location: 'Warehouse 2',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    // Add more initial products as needed
  ];

  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = (newProduct: any) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleSearch = (query: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <ProductHeader onAddProduct={handleAddProduct} onSearch={handleSearch} />
      <div className="container">
        <div className="product-content">
          <ProductList onProductClick={handleProductClick} products={filteredProducts} />
          {selectedProduct && (
            <ProductDetailsPreview product={selectedProduct} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
