

// import React, { useState, useEffect } from 'react';
// import '../../styles/Merchant/ProductPage.css';

// interface Product {
//   id: string;
//   name: string;
//   sku: string;
//   merchant: string;
//   status: string;
//   qty: number;
//   image?: string;
//   isBestSeller?: boolean;
// }

// const Product: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([
//     { id: '1891F', name: 'Maize Flour', sku: '12569756', merchant: 'BIDCO Kenya', status: 'Unpaid', qty: 110, isBestSeller: true },
//     { id: '1892F', name: 'Rice', sku: '12569757', merchant: 'Mwea Rice', status: 'Paid', qty: 200, isBestSeller: false },
//     { id: '1893F', name: 'Beans', sku: '12569758', merchant: 'BIDCO Kenya', status: 'Unpaid', qty: 150, isBestSeller: true },
//   ]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [filterOption, setFilterOption] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

//   useEffect(() => {
//     filterProducts();
//   }, [filterOption, searchTerm, products]);

//   const filterProducts = () => {
//     let filtered = products;

//     if (searchTerm) {
//       filtered = filtered.filter(product => {
//         switch (filterOption) {
//           case 'product':
//             return product.name.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'merchant':
//             return product.merchant.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'bestseller':
//             return product.isBestSeller && product.name.toLowerCase().includes(searchTerm.toLowerCase());
//           case 'id':
//             return product.id.toLowerCase().includes(searchTerm.toLowerCase());
//           default:
//             return (
//               product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               product.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               product.id.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }
//       });
//     }

//     setFilteredProducts(filtered);
//   };

//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsEditing(false);
//   };

//   const handleEdit = (product: Product) => {
//     setSelectedProduct(product);
//     setIsEditing(true);
//   };

//   const handleDelete = (id: string) => {
//     setProducts(products.filter(product => product.id !== id));
//     setSelectedProduct(null);
//   };

//   const handleSave = (updatedProduct: Product) => {
//     setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
//     setSelectedProduct(null);
//     setIsEditing(false);
//   };

//   const handleClose = () => {
//     setSelectedProduct(null);
//     setIsEditing(false);
//   };

//   return (
//     <div className="product-page">
//       <div className="filter-bar">
//         <select 
//           className="filter-select" 
//           value={filterOption} 
//           onChange={(e) => setFilterOption(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="product">Product</option>
//           <option value="merchant">Merchant</option>
//           <option value="bestseller">Best Seller</option>
//           <option value="id">ID No</option>
//         </select>
//         <input 
//           type="text" 
//           placeholder="Search..." 
//           value={searchTerm} 
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
        
//       </div>
//       <div className="product-table-container">
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>No ID</th>
//               <th>Product</th>
//               <th>SKU</th>
//               <th>Merchant</th>
//               <th>Status</th>
//               <th>Qty</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product) => (
//               <tr key={product.id} onClick={() => handleProductClick(product)}>
//                 <td>{product.id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.sku}</td>
//                 <td>{product.merchant}</td>
//                 <td>{product.status}</td>
//                 <td>{product.qty}</td>
//                 <td>
//                   <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEdit(product); }}>✎</button>
//                   <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}>🗑</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {selectedProduct && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClose}>×</button>
//             {isEditing ? (
//               <EditForm product={selectedProduct} onSave={handleSave} onCancel={handleClose} />
//             ) : (
//               <PreviewProduct product={selectedProduct} />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const PreviewProduct: React.FC<{ product: Product }> = ({ product }) => (
//   <div className="preview-product">
//     <h2>Preview Product</h2>
//     <div className="product-image">
//       {product.image ? (
//         <img src={product.image} alt={product.name} />
//       ) : (
//         <div className="placeholder-image">No Image</div>
//       )}
//     </div>
//     <h3>{product.name}</h3>
//     <p>Quantity: {product.qty}</p>
//     <p>Merchant: {product.merchant}</p>
//     <p>Price per Unit: KSh 1,250</p>
//     <p>Transaction ID: 11D0B7960F</p>
//     <p>Total Amount: KSh 50,000</p>
//     <p>Paid Amount: KSh 25,000</p>
//     <p>Amount Due: KSh 15,000</p>
//     <p>Payment Date: 15-08-2024 14:56</p>
//     <p>Due Date: 25-09-2024 13:00</p>
//   </div>
// );

// const EditForm: React.FC<{ product: Product; onSave: (product: Product) => void; onCancel: () => void }> = ({ product, onSave, onCancel }) => {
//   const [editedProduct, setEditedProduct] = useState(product);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(editedProduct);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Product</h2>
//       <div className="form-group">
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" name="name" value={editedProduct.name} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="sku">SKU:</label>
//         <input type="text" id="sku" name="sku" value={editedProduct.sku} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="merchant">Merchant:</label>
//         <input type="text" id="merchant" name="merchant" value={editedProduct.merchant} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="status">Status:</label>
//         <input type="text" id="status" name="status" value={editedProduct.status} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label htmlFor="qty">Quantity:</label>
//         <input type="number" id="qty" name="qty" value={editedProduct.qty} onChange={handleChange} />
//       </div>
//       <button type="submit">Save</button>
//       <button type="button" onClick={onCancel}>Cancel</button>
//     </form>
//   );
// };

// export default Product;

// import React from 'react';
// import '../../styles/Merchant/ProductPage.css';

// interface Product {
//   id: string;
//   name: string;
//   image: string;
//   stock: number;
//   location: string;
//   price: number;
//   status: string;
// }

// interface ProductPreviewProps {
//   product: Product;
// }

// const Products: React.FC<ProductPreviewProps> = ({ product }) => {
//   return (
//     <div className="product-preview">
//       <img src={product.image} alt={product.name} className="product-image" />
//       <h3>{product.id} - {product.name}</h3>
//       <p>Stock: {product.stock} - {product.location}</p>
//       <p>Price: {product.price}</p>
//       <p>Status: {product.status}</p>
//     </div>
//   );
// };

// export default Products;





import React, { useState } from 'react';
import '../../styles/Merchant/ProductPage.css';

interface Product {
  id: string;
  name: string;
  image: string;
  stock: number;
  location: string;
  price: number;
  status: string;
  isBestSeller: boolean;
}

const initialProducts: Product[] = [
  {
    id: '17410',
    name: 'Dollar watch',
    image: 'https://via.placeholder.com/150',
    stock: 1106,
    location: 'Warehouse 1',
    price: 1230,
    status: 'Ready Stock',
    isBestSeller: true,
  },
  {
    id: '17420',
    name: 'Dollar watch',
    image: 'https://via.placeholder.com/150',
    stock: 1106,
    location: 'Warehouse 1',
    price: 1230,
    status: 'Ready Stock',
    isBestSeller: true,
  },
  {
    id: '17430',
    name: 'Dollar watch',
    image: 'https://via.placeholder.com/150',
    stock: 1106,
    location: 'Warehouse 1',
    price: 1230,
    status: 'Ready Stock',
    isBestSeller: false,
  },
  {
    id: '17440',
    name: 'Dollar watch',
    image: 'https://via.placeholder.com/150',
    stock: 1106,
    location: 'Warehouse 1',
    price: 1230,
    status: 'Ready Stock',
    isBestSeller: true,
  },
  {
    id: '17450',
    name: 'Dollar watch',
    image: 'https://via.placeholder.com/150',
    stock: 1106,
    location: 'Warehouse 1',
    price: 1230,
    status: 'Ready Stock',
    isBestSeller: false,
  },
  // Add more products here...
];

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filterOption, setFilterOption] = useState<string>('');
  const [showBestSeller, setShowBestSeller] = useState(false);

  const handleFilter = (option: string) => {
    setFilterOption(option);
    let sortedProducts = [...products];
    if (option === 'id') {
      sortedProducts.sort((a, b) => a.id.localeCompare(b.id));
    } else if (option === 'product') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    setProducts(sortedProducts);
  };

  const toggleBestSeller = () => {
    setShowBestSeller(!showBestSeller);
    if (!showBestSeller) {
      setProducts(initialProducts.filter(product => product.isBestSeller));
    } else {
      setProducts(initialProducts);
    }
  };

  return (
    <div className="product-page">
      <div className="product-controls">
        {/* <input type="text" placeholder="Search..." className="search-input" /> */}
        {/* <select onChange={(e) => handleFilter(e.target.value)} value={filterOption}>
          <option value="">Filter</option>
          <option value="id">ID No</option>
          <option value="product">Product</option>
        </select> */}
        <button 
          className={`btn ${showBestSeller ? 'btn-active' : ''}`} 
          onClick={toggleBestSeller}
        >
          Best Seller
        </button>
        {/* <button className="btn">Add Item</button> */}
        {/* <div className="view-options">
          <button className="btn">☰</button>
          <button className="btn">⋮</button>
        </div> */}
      </div>
      <div className="product-content">
        <div className="product-list">
          <table>
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
                <tr key={product.id} onClick={() => setSelectedProduct(product)}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>12549756</td>
                  <td>{product.location}</td>
                  <td>Ksh {product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="btn btn-small">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProduct && (
          <div className="product-preview">
            <div className="preview-header">
              <h2>Preview Product</h2>
              <button onClick={() => setSelectedProduct(null)} className="btn-close">×</button>
            </div>
            <div className="preview-content">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />
              <div className="product-info">
                <h3>{selectedProduct.id} - {selectedProduct.name}</h3>
                <p>Stock: {selectedProduct.stock} - {selectedProduct.location}</p>
                <p>Price: Ksh {selectedProduct.price}</p>
                <p>Status: {selectedProduct.status}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;