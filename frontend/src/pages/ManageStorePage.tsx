import React from "react";
import "../styles/ManageStorePage.css";
import StoreList from "../components/StoreList";

const ManageStorePage: React.FC = () => {
  return (
    <div className="manage-store-page">
      <div className="main-content">
        <StoreList />
      </div>
     
    </div>
  );
};

export default ManageStorePage;
