import React from 'react';
import './Footer.css'; // Import the external CSS file

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };
  return (
    <footer className="footer">
      <div className="footer-top">
      <p onClick={scrollToTop} style={{ cursor: 'pointer' }}>Back to top</p>
      </div>
      <div className="footer-columns">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Amazon Payment Products</h3>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
