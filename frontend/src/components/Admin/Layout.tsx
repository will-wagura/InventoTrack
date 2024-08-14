/* src/components/Layout.tsx */
import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
