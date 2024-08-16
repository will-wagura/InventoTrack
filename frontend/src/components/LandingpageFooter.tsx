import "./Footer.css";
import newLogo from "../image/inventotrack-high-resolution-logo-transparent-side.png";

interface Props {
  setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
}

const Footer = ({ setActiveComponent }: Props) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logoSection">
          <img src={newLogo} alt="InventoTrack Logo" className="logo" />
          <p>Inventory simplified for small teams and developers.</p>
        </div>
        <div className="linksSection">
          <div className="column">
            <h4>Follow us</h4>
            <div className="socialIcons">
              <a href="https://facebook.com" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <p>Call us</p>
            <p>+254 792 313 772</p>
          </div>
          <div className="column">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#" onClick={() => setActiveComponent("landingPage")}>
                  Landing Page
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("popupBuilder")}>
                  Popup Builder
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("webDesign")}>
                  Web-design
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("content")}>
                  Content
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("integrations")}>
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>Use Cases</h4>
            <ul>
              <li>
                <a href="#" onClick={() => setActiveComponent("webDesigners")}>
                  Web-designers
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("marketers")}>
                  Marketers
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("smallBusiness")}>
                  Small Business
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setActiveComponent("websiteBuilder")}
                >
                  Website Builder
                </a>
              </li>
            </ul>
          </div>
          <div className="column">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#" onClick={() => setActiveComponent("aboutUs")}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("careers")}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("faqs")}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("teams")}>
                  Teams
                </a>
              </li>
              <li>
                <a href="#" onClick={() => setActiveComponent("contactUs")}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottomBar">
        <div className="container">
          <p>&copy; 2024 All Rights Reserved.</p>
          <ul>
            <li>
              <a href="https://example.com/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="https://example.com/terms-of-use">Terms of Use</a>
            </li>
            <li>
              <a href="https://example.com/sales-and-refunds">
                Sales and Refunds
              </a>
            </li>
            <li>
              <a href="https://example.com/legal">Legal</a>
            </li>
            <li>
              <a href="https://example.com/site-map">Site Map</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
