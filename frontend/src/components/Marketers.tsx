// src/components/Marketers.js
import "./Marketers.css";

function Marketers() {
  return (
    <div className="marketers">
      <h1>For Marketers</h1>
      <p>
        Leverage InventoTrack's features to boost your marketing efforts and
        drive sales.
      </p>
      <div className="marketer-tools">
        <div className="tool">
          <h3>Campaign Tracking</h3>
          <p>Track inventory levels and sales across marketing campaigns.</p>
        </div>
        <div className="tool">
          <h3>Customer Insights</h3>
          <p>Gain valuable insights into customer purchasing behavior.</p>
        </div>
        <div className="tool">
          <h3>Promotional Management</h3>
          <p>Easily manage and track promotional inventory and discounts.</p>
        </div>
      </div>
      <button className="cta-button">Explore Marketing Features</button>
    </div>
  );
}

export default Marketers;
