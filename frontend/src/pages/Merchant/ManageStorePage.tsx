import React from "react";
import "../../styles/Merchant/ManageStorePage.css";
import StoreList from "../../components/Merchant/StoreList";

const ManageStorePage: React.FC = () => {
  return (
    <div className="manage-store">
      <header className="store-header">
                <h1>Manage Store</h1>
            </header>
      <div className="main-content">
      
        <StoreList />
      </div>
     
    </div>
  );
};

export default ManageStorePage;
