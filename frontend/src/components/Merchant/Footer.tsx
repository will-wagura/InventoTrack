// components/Footer.tsx
import React from "react";
import styles from "../../styles/Merchant/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img
            src="/src/assets/inventotrack-high-resolution-logo-transparent (2).png"
            alt="InventoTrack Logo"
            className={styles.logo}
          />
          <p>Inventory simplified for small teams and developers.</p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.column}>
            <h4>Follow us</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p>Call us</p>
            <p>+254 792 313 772</p>
          </div>

          <div className={styles.column}>
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Landing Page</a>
              </li>
              <li>
                <a href="#">Popup Builder</a>
              </li>
              <li>
                <a href="#">Web-design</a>
              </li>
              <li>
                <a href="#">Content</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Use Cases</h4>
            <ul>
              <li>
                <a href="#">Web-designers</a>
              </li>
              <li>
                <a href="#">Marketers</a>
              </li>
              <li>
                <a href="#">Small Business</a>
              </li>
              <li>
                <a href="#">Website Builder</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Teams</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <p>&copy; 2024 All Rights Reserved.</p>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Use</a>
            </li>
            <li>
              <a href="#">Sales and Refunds</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Site Map</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
