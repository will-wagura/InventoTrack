import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inbox from "./components/Inbox";
import AdminActivity from "./components/AdminActivity";
import Home from "./pages/Home";
import ManageUsers from "./pages/ManageUsers";
import ManageStorePage from "./pages/ManageStorePage";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Statistic from "./pages/Statistic";
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
              <Route path="/payment" element={<Payment />} />
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
