// import React, { useState } from 'react';
// import '../styles/PaymentPage.css';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   isPaid: boolean;
// }

// interface Store {
//   id: number;
//   name: string;
//   products: Product[];
// }

// const initialStores: Store[] = [
//   {
//     id: 1,
//     name: "Store A",
//     products: [
//       { id: 1, name: "Product 1", price: 10000, isPaid: true },
//       { id: 2, name: "Product 2", price: 15000, isPaid: false },
//       { id: 3, name: "Product 3", price: 20000, isPaid: true },
//     ]
//   },
//   {
//     id: 2,
//     name: "Store B",
//     products: [
//       { id: 4, name: "Product 4", price: 12000, isPaid: false },
//       { id: 5, name: "Product 5", price: 18000, isPaid: true },
//       { id: 6, name: "Product 6", price: 22000, isPaid: false },
//     ]
//   },
// ];

// const Payment: React.FC = () => {
//   const [stores, setStores] = useState<Store[]>(initialStores);

//   const togglePaymentStatus = (storeId: number, productId: number) => {
//     setStores(prevStores => 
//       prevStores.map(store => 
//         store.id === storeId 
//           ? {
//               ...store,
//               products: store.products.map(product => 
//                 product.id === productId 
//                   ? { ...product, isPaid: !product.isPaid }
//                   : product
//               )
//             }
//           : store
//       )
//     );
//   };

//   return (
//     <div className="payment-page">
//       <h1>Payment Overview</h1>
//       {stores.map(store => (
//         <div key={store.id} className="store-section">
//           <h2>{store.name}</h2>
//           <div className="payment-overview">
//             <div className="overview-item">
//               <h3>Paid Products</h3>
//               <p>{store.products.filter(p => p.isPaid).length}</p>
//             </div>
//             <div className="overview-item">
//               <h3>Unpaid Products</h3>
//               <p>{store.products.filter(p => !p.isPaid).length}</p>
//             </div>
//           </div>
//           <div className="product-lists">
//             <div className="product-list">
//               <h3>Paid Products</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {store.products.filter(p => p.isPaid).map(product => (
//                     <tr key={product.id}>
//                       <td>{product.name}</td>
//                       <td>Ksh{product.price.toFixed(2)}</td>
//                       <td>
//                         <button onClick={() => togglePaymentStatus(store.id, product.id)}>
//                           Mark as Unpaid
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="product-list">
//               <h3>Unpaid Products</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {store.products.filter(p => !p.isPaid).map(product => (
//                     <tr key={product.id}>
//                       <td>{product.name}</td>
//                       <td>Ksh{product.price.toFixed(2)}</td>
//                       <td>
//                         <button onClick={() => togglePaymentStatus(store.id, product.id)}>
//                           Mark as Paid
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Payment;