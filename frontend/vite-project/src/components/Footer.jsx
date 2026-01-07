import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/footer.css";

const Footer = () => {
  const { t } = useTranslation();

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
          <h3>{t('footer.orgName')}</h3>
          <p className="registration-info">
            {t('footer.registrationInfo')}
          </p>
          <p>
            {t('footer.description')}
          </p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook">📘</a>
            <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            <a href="#" className="social-icon" aria-label="YouTube">📺</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.quickLinks')}</h3>
          <div className="footer-links">
            <Link to="/news" onClick={scrollToTop}>{t('footer.newsEvents')}</Link>
            <Link to="/gallery" onClick={scrollToTop}>{t('footer.photoGallery')}</Link>
            <Link to="/social-work" onClick={scrollToTop}>{t('navbar.socialWork')}</Link>
            <Link to="/members" onClick={scrollToTop}>{t('navbar.members')}</Link>
            <Link to="/about" onClick={scrollToTop}>{t('navbar.aboutUs')}</Link>
            <Link to="/update-info" onClick={scrollToTop}>{t('navbar.updateInfo')}</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3>{t('footer.contactUs')}</h3>
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
        <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
        <p>{t('footer.madeWith')}</p>
      </div>
    </footer>
  );
};

export default Footer;
