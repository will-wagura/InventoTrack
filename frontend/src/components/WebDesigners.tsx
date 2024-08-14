// src/components/WebDesigners.js
import './WebDesigners.css';

function WebDesigners() {
  return (
    <div className="web-designers">
      <h1>For Web Designers</h1>
      <p>Enhance your web design projects with InventoTrack's powerful inventory management features.</p>
      <div className="designer-benefits">
        <div className="benefit">
          <h3>Customizable UI</h3>
          <p>Easily customize InventoTrack's interface to match your client's brand.</p>
        </div>
        <div className="benefit">
          <h3>API Integration</h3>
          <p>Seamlessly integrate InventoTrack into your web applications.</p>
        </div>
        <div className="benefit">
          <h3>White-Label Solution</h3>
          <p>Offer InventoTrack as your own branded inventory management solution.</p>
        </div>
      </div>
      <button className="cta-button">Join Our Designer Program</button>
    </div>
  );
}

export default WebDesigners;