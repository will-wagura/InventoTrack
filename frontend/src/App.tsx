
<<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Sidebar from "./components/Merchant/Sidebar";
// import Footer from "./components/Merchant/Footer";
// import Header from "./components/Merchant/Header";
// import Inbox from "./components/Merchant/Inbox";
// import AdminActivity from "./components/Merchant/AdminActivity";
// import Home from "./pages/Merchant/Home";
// import ManageUsers from "./pages/Merchant/ManageUsers";
// import ManageStorePage from "./pages/Merchant/ManageStorePage";
// import Order from "./pages/Merchant/Order";
// import Products from "./pages/Merchant/Products";
// import Settings from "./pages/Merchant/Settings";
// import Statistic from "./pages/Merchant/Statistic";
// import ClerkHome from "./components/clerk/Home";
// import ItemEntry from "./components/clerk/ItemEntry";
// import StockInformation from "./components/clerk/StockInformation";
// import SupplyRequests from "./components/clerk/SupplyRequests";
// import AdminHome from "./pages/Admin/HomePage";
// import ProductPage from "./pages/Admin/ProductPage";
// import OrderPage from "./pages/Admin/OrderPage";
// import PaymentPage from "./pages/Admin/PaymentPage";
// import StatisticsPage from "./pages/Admin/StatisticsPage";
// import ManageUserPage from "./pages/Admin/ManageUserPage";
// import SettingPage from "./pages/Admin/SettingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ContactUs from "./components/ContactUs";
// import AboutUs from "./components/AboutUs";
// import Careers from "./components/Careers";
// import FAQs from "./components/FAQs";
// import Teams from "./components/Teams";
// import styles from "./App.module.css";
// import { Item } from "./types/Item";

// const App: React.FC = () => {
//   const [user, setUser] = useState<{ role: string } | null>(null);
//   const [activeComponent, setActiveComponent] = useState("home");
//   const [items, setItems] = useState<Item[]>(() => {
//     const storedItems = localStorage.getItem("items");
//     return storedItems ? JSON.parse(storedItems) : [];
//   });

//   useEffect(() => {
//     const updatedItems = items.map((item) => ({
//       ...item,
//       stockStatus: item.stockStatus || "In Stock",
//     }));
//     if (JSON.stringify(updatedItems) !== JSON.stringify(items)) {
//       localStorage.setItem("items", JSON.stringify(updatedItems));
//       setItems(updatedItems);
//     }
//   }, [items]);

//   const handleAddItem = (newItem: Item) => {
//     const updatedItems = [...items, newItem];
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   const handleDeleteItem = (index: number) => {
//     const updatedItems = items.filter((_, i: number) => i !== index);
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   const handleEditItem = (index: number, editedItem: Item) => {
//     const updatedItems = items.map((item, i: number) =>
//       i === index ? editedItem : item
//     );
//     setItems(updatedItems);
//     localStorage.setItem("items", JSON.stringify(updatedItems));
//   };

//   useEffect(() => {
//     // Simulate authentication check
//     const fetchUser = async () => {
//       // Replace with your actual authentication logic
//       // e.g., fetch user from API or local storage
//       const loggedInUser = { role: 'clerk' }; // Example role; replace with actual role fetching logic
//       setUser(loggedInUser);
//     };
//     fetchUser();
//   }, []);

//   if (!user) {
//     return (
//       <Router>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     );
//   }

//   const renderClerkDashboard = () => (
//     <div className="app">
//       <Sidebar setActiveComponent={setActiveComponent} />
//       <main className="main-content">
//         {renderClerkComponent()}
//       </main>
//       <Inbox />
//       <Footer />
//     </div>
//   );

//   const renderAdminDashboard = () => (
//     <div className="App">
//       <Sidebar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<AdminHome />} />
//           <Route path="/product" element={<ProductPage />} />
//           <Route path="/order" element={<OrderPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/statistics" element={<StatisticsPage />} />
//           <Route path="/manage-user" element={<ManageUserPage />} />
//           <Route path="/setting" element={<SettingPage />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );

//   const renderClerkComponent = () => {
//     switch (activeComponent) {
//       case "home":
//         return <ClerkHome />;
//       case "itemEntry":
//         return <ItemEntry onAddItem={handleAddItem} />;
//       case "stockInfo":
//         return (
//           <StockInformation
//             items={items}
//             onDelete={handleDeleteItem}
//             onEdit={handleEditItem}
//           />
//         );
//       case "supplyRequests":
//         return <SupplyRequests />;
//       case "contactUs":
//         return <ContactUs />;
//       case "aboutUs":
//         return <AboutUs />;
//       case "careers":
//         return <Careers />;
//       case "faqs":
//         return <FAQs />;
//       case "teams":
//         return <Teams />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Router>
//       <div className={styles.container}>
//         {user.role === 'merchant' && (
//           <>
//             <Sidebar />
//             <div className={styles.mainContainer}>
//               <Header />
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/manage-store" element={<ManageStorePage />} />
//                 <Route path="/manage-users" element={<ManageUsers />} />
//                 <Route path="/order" element={<Order />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="/statistic" element={<Statistic />} />
//               </Routes>
//             </div>
//             <div className="right-sidebar">
//               <Inbox />
//               <AdminActivity />
//             </div>
//           </>
//         )}
//         {user.role === 'clerk' && renderClerkDashboard()}
//         {user.role === 'admin' && renderAdminDashboard()}
//       </div>
//     </Router>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Sidebar from "./components/Merchant/Sidebar";
// import Footer from "./components/Merchant/Footer";
// import Header from "./components/Merchant/Header";
// import Inbox from "./components/Merchant/Inbox";
// import AdminActivity from "./components/Merchant/AdminActivity";
// import Home from "./pages/Merchant/Home";
// import ManageUsers from "./pages/Merchant/ManageUsers";
// import ManageStorePage from "./pages/Merchant/ManageStorePage";
// import Order from "./pages/Merchant/Order";
// import Products from "./pages/Merchant/Products";
// import Settings from "./pages/Merchant/Settings";
// import Statistic from "./pages/Merchant/Statistic";
// import ClerkHome from "./components/Clerk/Home";
// import ItemEntry from "./components/Clerk/ItemEntry";
// import StockInformation from "./components/Clerk/StockInformation";
// import SupplyRequests from "./components/Clerk/SupplyRequests";
// import AdminHome from "./pages/Admin/HomePage";
// import ProductPage from "./pages/Admin/ProductPage";
// import OrderPage from "./pages/Admin/OrderPage";
// import PaymentPage from "./pages/Admin/PaymentPage";
// import StatisticsPage from "./pages/Admin/StatisticsPage";
// import ManageUserPage from "./pages/Admin/ManageUserPage";
// import SettingPage from "./pages/Admin/SettingPage";
// import ContactUs from "./components/ContactUs";
// import AboutUs from "./components/AboutUs";
// import Careers from "./components/Careers";
// import FAQs from "./components/FAQs";
// import Teams from "./components/Teams";
// import styles from "./App.module.css";
// import { Item } from "./types/Item";

// const App: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [activeComponent, setActiveComponent] = useState("home");

//   const handleAddItem = (newItem: Item) => {
//     setItems([...items, newItem]);
//   };

//   const handleDeleteItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleEditItem = (index: number, editedItem: Item) => {
//     setItems(items.map((item, i) => (i === index ? editedItem : item)));
//   };

//   const renderClerkDashboard = () => (
//     <div className="app">
//       <Sidebar setActiveComponent={setActiveComponent} />
//       <main className="main-content">
//         {renderClerkComponent()}
//       </main>
//       <Inbox />
//       <Footer />
//     </div>
//   );

//   const renderAdminDashboard = () => (
//     <div className="App">
//       <Sidebar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<AdminHome />} />
//           <Route path="/product" element={<ProductPage />} />
//           <Route path="/order" element={<OrderPage />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/statistics" element={<StatisticsPage />} />
//           <Route path="/manage-user" element={<ManageUserPage />} />
//           <Route path="/setting" element={<SettingPage />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );

//   const renderClerkComponent = () => {
//     switch (activeComponent) {
//       case "home":
//         return <ClerkHome />;
//       case "itemEntry":
//         return <ItemEntry onAddItem={handleAddItem} />;
//       case "stockInfo":
//         return (
//           <StockInformation
//             items={items}
//             onDelete={handleDeleteItem}
//             onEdit={handleEditItem}
//           />
//         );
//       case "supplyRequests":
//         return <SupplyRequests />;
//       case "contactUs":
//         return <ContactUs />;
//       case "aboutUs":
//         return <AboutUs />;
//       case "careers":
//         return <Careers />;
//       case "faqs":
//         return <FAQs />;
//       case "teams":
//         return <Teams />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/merchant/*" element={
//           <div className={styles.container}>
//             <Sidebar />
//             <div className={styles.mainContainer}>
//               <Header />
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/manage-store" element={<ManageStorePage />} />
//                 <Route path="/manage-users" element={<ManageUsers />} />
//                 <Route path="/order" element={<Order />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/settings" element={<Settings />} />
//                 <Route path="/statistic" element={<Statistic />} />
//               </Routes>
//             </div>
//             <div className="right-sidebar">
//               <Inbox />
//               <AdminActivity />
//             </div>
//           </div>
//         } />
//         <Route path="/clerk/*" element={renderClerkDashboard()} />
//         <Route path="/admin/*" element={renderAdminDashboard()} />
//         <Route path="*" element={<Navigate to="/merchant" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Merchant/Sidebar";
import Footer from "./components/Merchant/Footer";
import Header from "./components/Merchant/Header";
import Inbox from "./components/Merchant/Inbox";
import AdminActivity from "./components/Merchant/AdminActivity";
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import AdminActivity from "./components/AdminActivity";
>>>>>>> 28f47f84ffbec8cbf831c5214112643810d4ff81
import Home from "./pages/Merchant/Home";
import ManageUsers from "./pages/Merchant/ManageUsers";
import ManageStorePage from "./pages/Merchant/ManageStorePage";
import Order from "./pages/Merchant/Order";
import Products from "./pages/Merchant/Products";
import Settings from "./pages/Merchant/Settings";
import Statistic from "./pages/Merchant/Statistic";
import ClerkHome from "./components/Clerk/Home";
import ItemEntry from "./components/Clerk/ItemEntry";
import StockInformation from "./components/Clerk/StockInformation";
import SupplyRequests from "./components/Clerk/SupplyRequests";
import AdminHome from "./pages/Admin/HomePage";
import ProductPage from "./pages/Admin/ProductPage";
import OrderPage from "./pages/Admin/OrderPage";
import PaymentPage from "./pages/Admin/PaymentPage";
import StatisticsPage from "./pages/Admin/StatisticsPage";
import ManageUserPage from "./pages/Admin/ManageUserPage";
import SettingPage from "./pages/Admin/SettingPage";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Careers from "./components/Careers";
import FAQs from "./components/FAQs";
import Teams from "./components/Teams";
import styles from "./App.module.css";
import { Item } from "./types/Item";
import SidebarClerk from "./components/Clerk/SidebarClerk";


const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeComponent, setActiveComponent] = useState("home");

  const handleAddItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number, editedItem: Item) => {
    setItems(items.map((item, i) => (i === index ? editedItem : item)));
  };

  return (

    <Router>
      <Routes>
        <Route path="/merchant/*" element={
          <div className={styles.container}>
            <Sidebar />
         
              
            <div className={styles.mainContainer}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manage-store" element={<ManageStorePage />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/order" element={<Order />} />
                <Route path="/products" element={<Products />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/statistic" element={<Statistic />} />
              </Routes>
            <div className="right-sidebar">
              <Inbox />
              <AdminActivity />
            </div>
           
            </div>
           
          </div>
        } />
        <Route path="/clerk/*" element={
          <div className="app">
            <SidebarClerk setActiveComponent={setActiveComponent} />
            <main className="main-content">
              <Routes>
                <Route path="/home" element={<ClerkHome />} />
                <Route path="/item-entry" element={<ItemEntry onAddItem={handleAddItem} />} />
                <Route path="/stock-info" element={
                  <StockInformation
                    items={items}
                    onDelete={handleDeleteItem}
                    onEdit={handleEditItem}
                  />
                } />
                <Route path="/supply-requests" element={<SupplyRequests />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/teams" element={<Teams />} />
              </Routes>
            </main>
            <Inbox />
            <Footer />
          </div>
        } />
        <Route path="/admin/*" element={
          <div className="App">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/manage-user" element={<ManageUserPage />} />
                <Route path="/setting" element={<SettingPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        } />
        <Route path="*" element={<Navigate to="/merchant" />} />
      </Routes>
    </Router>
  );
};

export default App;

