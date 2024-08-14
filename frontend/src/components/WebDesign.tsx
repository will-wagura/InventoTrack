// src/components/WebDesign.js
import './WebDesign.css';

function WebDesign() {
  return (
    <div className="web-design">
      <h1>Web Design Services</h1>
      <p>Create stunning, responsive websites that capture your brand essence.</p>
      <div className="design-services">
        <div className="service">
          <h3>Custom Website Design</h3>
          <p>Tailored designs that reflect your unique brand identity.</p>
        </div>
        <div className="service">
          <h3>E-commerce Solutions</h3>
          <p>Build powerful online stores to boost your sales.</p>
        </div>
        <div className="service">
          <h3>Responsive Design</h3>
          <p>Ensure your website looks great on all devices.</p>
        </div>
      </div>
      <button className="cta-button">Get a Free Quote</button>
    </div>
  );
}

export default WebDesign;