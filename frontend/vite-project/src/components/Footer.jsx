import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  // Function to scroll to top when clicking on footer links
  const scrollToTop = () => {
    // Target the #root element which is the actual scroll container
    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
    }
    // Fallbacks
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kerala Samajam Vasai East (Regd.)</h3>
          <p className="registration-info">
            Registration No.: F-0000973(PLGR)
          </p>
          <p>
            Celebrating Kerala's rich heritage, culture, and traditions.
            Building a strong community that connects Keralites worldwide.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">📘</a>
            <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            <a href="#" className="social-icon" aria-label="YouTube">📺</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <div className="footer-links">
            <Link to="/news" onClick={scrollToTop}>News & Events</Link>
            <Link to="/gallery" onClick={scrollToTop}>Photo Gallery</Link>
            <Link to="/social-work" onClick={scrollToTop}>Social Work</Link>
            <Link to="/members" onClick={scrollToTop}>Members</Link>
            <Link to="/about" onClick={scrollToTop}>About Us</Link>
            <Link to="/update-info" onClick={scrollToTop}>Update Info</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span>📍</span>
              <p>B/5, Ground Floor, A/10, Shree Mahalaxmi CHS Ltd., Dewan & Sons Enclave, Vasai (E), Dist. Palghar - 401 208</p>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <p>
                <a href="tel:+919022986841">+91 9022986841</a>
                <br />
                <a href="tel:+919271560240">+91 9271560240</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kerala Samajam Vasai East (Regd.). All Rights Reserved.</p>
        <p>Made with ❤️ for the Kerala Community</p>
      </div>
    </footer>
  );
};

export default Footer;
