import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Merchant/Sidebar";
import Footer from "../components/Merchant/Footer";
import Header from "../components/Merchant/Header";
import Inbox from "../components/Merchant/Inbox";
import AdminActivity from "../components/Merchant/AdminActivity";
import Home from "./Merchant/Home";
import ManageUsers from "./Merchant/ManageUsers";
import ManageStorePage from "./Merchant/ManageStorePage";
import Order from "./Merchant/Order";
import Products from "./Merchant/Products";
import Settings from "./Merchant/Settings";
import Statistic from "./Merchant/Statistic";
import { containerStyle, mainContainerStyle, contentWrapperStyle } from "../AppStyles";

const SuperuserDashboard: React.FC = () => {
    return (
        <Router>
            <div style={containerStyle}>
                <div style={containerStyle}>
                    <Sidebar />
                    <div style={mainContainerStyle}>
                        <Header />
                        <div style={contentWrapperStyle}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/manage-store" element={<ManageStorePage />} />
                                <Route path="/manage-users" element={<ManageUsers />} />
                                <Route path="/order" element={<Order />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/statistic" element={<Statistic />} />
                            </Routes>
                        </div>
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

export default SuperuserDashboard;