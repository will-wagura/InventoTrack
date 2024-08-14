// src/components/Integrations.js
import './Integrations.css';

function Integrations() {
  return (
    <div className="integrations">
      <h1>Integrations</h1>
      <p>Connect InventoTrack with your favorite tools and services.</p>
      <div className="integration-list">
        <div className="integration-item">
          <img src="/path-to-shopify-logo.png" alt="Shopify" />
          <h3>Shopify</h3>
          <p>Sync your Shopify inventory with InventoTrack.</p>
        </div>
        <div className="integration-item">
          <img src="/path-to-quickbooks-logo.png" alt="QuickBooks" />
          <h3>QuickBooks</h3>
          <p>Streamline your accounting with QuickBooks integration.</p>
        </div>
        <div className="integration-item">
          <img src="/path-to-zapier-logo.png" alt="Zapier" />
          <h3>Zapier</h3>
          <p>Connect InventoTrack to 1000+ apps with Zapier.</p>
        </div>
      </div>
      <button className="cta-button">Explore All Integrations</button>
    </div>
  );
}

export default Integrations;