import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Create this file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/comercialproprty.in/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Address Section */}
        <div className="footer-section">
          <h3>Our Addresses</h3>
          <div className="addresses">
            <div className="address">
              <h4>Head Office</h4>
              <p>Dwarka sector 10</p>
            </div>
            <div className="address">
              <h4>holding</h4>
              <p>Abhinay & Harsh </p>
            </div>
            <div className="address">
              <h4>contact Info</h4>
              <p>+91 9625949983 and +91 9310004609</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Commercial Properties. All rights reserved. Made by Abhinay</p>
      </div>
    </footer>
  );
};

export default Footer;
