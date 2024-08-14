
import './Home.css';
import { FaChartLine, FaBoxOpen, FaClipboardList, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to InventoTrack</h1>
        <p>Simplify your inventory management with our powerful tools.</p>
        <button className="cta-button">Get Started <FaArrowRight /></button>
      </div>
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <FaChartLine />
          </div>
          <h3>Stock Insights</h3>
          <p>Get real-time updates on your inventory levels and trends.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaBoxOpen />
          </div>
          <h3>Item Entry</h3>
          <p>Easily add new items to your inventory with our intuitive form.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <FaClipboardList />
          </div>
          <h3>Supply Requests</h3>
          <p>Manage your supply requests and stay on top of your inventory needs.</p>
        </div>
      </div>
      <div className="why-us">
        <h2>Why Choose InventoTrack?</h2>
        <ul>
          <li><FaCheckCircle /> Easy to use interface</li>
          <li><FaCheckCircle /> Real-time inventory tracking</li>
          <li><FaCheckCircle /> Comprehensive analytics</li>
          <li><FaCheckCircle /> Seamless integration with other tools</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;