// src/components/SmallBusiness.js
import './SmallBusiness.css';

function SmallBusiness() {
  return (
    <div className="small-business">
      <h1>InventoTrack for Small Businesses</h1>
      <p>Affordable, scalable inventory management solutions tailored for small businesses.</p>
      <div className="business-features">
        <div className="feature">
          <h3>Easy Setup</h3>
          <p>Get started quickly with our user-friendly interface.</p>
        </div>
        <div className="feature">
          <h3>Affordable Pricing</h3>
          <p>Plans that grow with your business, starting at just $19/month.</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>Our team is always here to help you succeed.</p>
        </div>
      </div>
      <button className="cta-button">Start Your Free Trial</button>
    </div>
  );
}

export default SmallBusiness;