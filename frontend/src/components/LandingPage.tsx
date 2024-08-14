// src/components/LandingPage.js
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to InventoTrack</h1>
      <p>Streamline your inventory management with our powerful, easy-to-use solution.</p>
      <div className="cta-buttons">
        <button className="primary-cta">Get Started</button>
        <button className="secondary-cta">Learn More</button>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Real-time Tracking</h3>
          <p>Monitor your inventory levels in real-time.</p>
        </div>
        <div className="feature">
          <h3>Easy Integration</h3>
          <p>Seamlessly integrate with your existing systems.</p>
        </div>
        <div className="feature">
          <h3>Customizable Reports</h3>
          <p>Generate detailed reports tailored to your needs.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;