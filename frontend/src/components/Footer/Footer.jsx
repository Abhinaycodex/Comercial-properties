import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Address Section */}
        <div className="footer-section">
          <h3>Our Addresses</h3>
          <div className="addresses">
            <div className="address">
              <h4>Head Office</h4>
              <p>123 Commercial St, New York, NY 10001</p>
            </div>
            <div className="address">
              <h4>Branch Office</h4>
              <p>456 Corporate Blvd, Los Angeles, CA 90015</p>
            </div>
            <div className="address">
              <h4>Europe Office</h4>
              <p>789 Business Rd, London, UK E1 6AN</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Commercial Properties. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
