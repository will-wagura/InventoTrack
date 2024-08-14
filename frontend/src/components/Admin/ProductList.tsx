import React from 'react';
import './ProductList.css';

const ProductList: React.FC<{ onProductClick: (product: any) => void }> = ({ onProductClick }) => {
  const products = [
    {
      id: '1741D',
      name: 'Dollan Watch',
      sku: '12569756',
      location: 'Warehouse 1',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png', // Ensure this image path is correct
    },
    {
      id: '1742D',
      name: 'Dollan Watch',
      sku: '12569757',
      location: 'Warehouse 2',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1743D',
      name: 'Dollan Watch',
      sku: '12569758',
      location: 'Warehouse 3',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1744D',
      name: 'Dollan Watch',
      sku: '12569759',
      location: 'Warehouse 4',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1745D',
      name: 'Dollan Watch',
      sku: '12569760',
      location: 'Warehouse 5',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1746D',
      name: 'Dollan Watch',
      sku: '12569761',
      location: 'Warehouse 6',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1747D',
      name: 'Dollan Watch',
      sku: '12569762',
      location: 'Warehouse 7',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1748D',
      name: 'Dollan Watch',
      sku: '12569763',
      location: 'Warehouse 8',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1749D',
      name: 'Dollan Watch',
      sku: '12569764',
      location: 'Warehouse 9',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
    {
      id: '1750D',
      name: 'Dollan Watch',
      sku: '12569765',
      location: 'Warehouse 10',
      price: 'Ksh 1,230',
      stock: 1108,
      status: 'Ready Stock',
      image: '/watch.png',
    },
  ];

  return (
    <table className="product-list">
      <thead>
        <tr>
          <th>No ID</th>
          <th>Product</th>
          <th>SKU</th>
          <th>Location</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} onClick={() => onProductClick(product)}>
            <td>{product.id}</td>
            <td className="product-name-cell">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.name}
            </td>
            <td>{product.sku}</td>
            <td>{product.location}</td>
            <td className="product-price">{product.price}</td>
            <td>{product.stock}</td>
            <td>{/* Add action buttons here */}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
