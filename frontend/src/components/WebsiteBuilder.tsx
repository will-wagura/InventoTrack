// src/components/WebsiteBuilder.js
import './WebsiteBuilder.css';

function WebsiteBuilder() {
  return (
    <div className="website-builder">
      <h1>InventoTrack Website Builder</h1>
      <p>Create a professional e-commerce website with built-in inventory management.</p>
      <div className="builder-features">
        <div className="feature">
          <h3>Drag-and-Drop Editor</h3>
          <p>Build your site easily with our intuitive drag-and-drop interface.</p>
        </div>
        <div className="feature">
          <h3>Responsive Templates</h3>
          <p>Choose from a variety of mobile-friendly templates.</p>
        </div>
        <div className="feature">
          <h3>Integrated Inventory</h3>
          <p>Manage your inventory directly from your website backend.</p>
        </div>
      </div>
      <button className="cta-button">Try Website Builder</button>
    </div>
  );
}

export default WebsiteBuilder;