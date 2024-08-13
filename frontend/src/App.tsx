import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import AdminActivity from "./components/AdminActivity";
import Home from "./pages/Merchant/Home";
import ManageUsers from "./pages/Merchant/ManageUsers";
import ManageStorePage from "./pages/Merchant/ManageStorePage";
import Order from "./pages/Merchant/Order";

import Product from "./pages/Merchant/Product";
import Settings from "./pages/Merchant/Settings";
import Statistic from "./pages/Merchant/Statistic";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.app}>
          <Sidebar />
          <div className={styles.mainContainer}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage-store" element={<ManageStorePage />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/order" element={<Order />} />

              <Route path="/product" element={<Product />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/statistic" element={<Statistic />} />
            </Routes>
          </div>
          <div className="right-sidebar">
            <Inbox />

            <AdminActivity />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
