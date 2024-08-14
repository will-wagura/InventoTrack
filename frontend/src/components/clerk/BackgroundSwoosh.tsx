import React from "react";
import "./BackgroundSwoosh.css";
import backgroundImage from "./backgroundImage/image.png"; // Adjust the path based on your file structure
import logoImage from "./backgroundImage/inventotrack-high-resolution-logo-transparent (2).png";
import Footer from "./Footer"; // Adjust the path based on your file structure

interface Props {
  children: React.ReactNode;
}

const BackgroundSwoosh = ({ children }: Props) => {
  return (
    <div className="background-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="swoosh-container">
        <div className="swoosh swoosh-1"></div>
        <div className="swoosh swoosh-2"></div>
        <div className="swoosh swoosh-3"></div>
      </div>
      <div className="logo">
        <img src={logoImage} alt="InventoTrack Logo" />
      </div>
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default BackgroundSwoosh;
