import React, { useState } from 'react';
import './ProductPage.css';
import ProductHeader from '../../components/Admin/ProductHeader';
import ProductList from '../../components/Admin/ProductList';
import ProductDetailsPreview from '../../components/Admin/ProductPreview';
import Filters from '../../components/Admin/Filters';

const ProductPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <ProductHeader />
      <div></div>
      <div className="container">
        <Filters />
        <div className="product-content">
          <ProductList onProductClick={handleProductClick} />
          {selectedProduct && (
            <ProductDetailsPreview product={selectedProduct} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
