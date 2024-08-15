import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Merchant/Sidebar";
import Footer from "./components/Merchant/Footer";
import Header from "./components/Merchant/Header";
import Inbox from "./components/Merchant/Inbox";
// import AdminActivity from "./components/Merchant/AdminActivity";
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
import SidebarAdmin from "./components/Admin/SidebarAdmin";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [, setActiveComponent] = useState("home");

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
            <div className="right-sidebars">
              <Inbox />
              {/* <AdminActivity /> */}
            </div>
            <Footer />
            </div>
            
          </div>
        } />
        <Route path="/clerk/*" element={
          <div className="app">
            <SidebarClerk setActiveComponent={() => {}} />
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
            <SidebarAdmin />
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