import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <footer className="bg-gradient-to-br from-gray-100 to-cream-soft text-text-dark py-12 px-[5%] pb-6 relative overflow-hidden border-t-[3px] border-gold-primary">
      {/* Shimmer border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-primary via-emerald-light to-gold-primary bg-[length:200%_100%] animate-shimmer"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {/* About Section */}
        <div>
          <h3 className="text-gold-accent mb-4 text-xl font-semibold drop-shadow-sm">{t('footer.orgName')}</h3>
          <p className="text-sm font-semibold text-gold-accent opacity-90 mb-2">
            {t('footer.registrationInfo')}
          </p>
          <p className="text-text-dark/80 text-[0.95rem] leading-7">
            {t('footer.description')}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gold-accent mb-4 text-xl font-semibold drop-shadow-sm">{t('footer.quickLinks')}</h3>
          <div className="flex flex-col gap-2">
            <Link to="/news" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('footer.newsEvents')}</Link>
            <Link to="/gallery" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('footer.photoGallery')}</Link>
            <Link to="/social-work" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('navbar.socialWork')}</Link>
            <Link to="/members" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('navbar.members')}</Link>
            <Link to="/about" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('navbar.aboutUs')}</Link>
            <Link to="/update-info" onClick={scrollToTop} className="text-text-dark/80 text-[0.95rem] leading-7 no-underline transition-all duration-300 hover:text-emerald-primary hover:opacity-100 hover:pl-1">{t('navbar.updateInfo')}</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gold-accent mb-4 text-xl font-semibold drop-shadow-sm">{t('footer.contactUs')}</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xl text-emerald-primary">📍</span>
              <p className="m-0 text-text-dark/80 text-[0.95rem]">{t('footer.address')}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl text-emerald-primary">📞</span>
              <p className="m-0">
                <a href="tel:+919022986841" className="text-text-dark/80 no-underline transition-all duration-300 hover:text-emerald-primary hover:underline">+91 9022986841</a>
                <br />
                <a href="tel:+919271560240" className="text-text-dark/80 no-underline transition-all duration-300 hover:text-emerald-primary hover:underline">+91 9271560240</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-black/10 pt-6 text-center text-sm text-text-dark/70">
        <p className="my-1">© {new Date().getFullYear()} {t('footer.copyright')}</p>
        <p className="my-1">{t('footer.madeWith')}</p>
      </div>
    </footer>
  );
};

export default Footer;
