import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">{t('navbar.logo')}</Link>

      {/* Hamburger Menu Button */}
      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li onClick={closeMenu}>
          <Link to="/news">{t('navbar.news')}</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/gallery">{t('navbar.gallery')}</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/social-work">{t('navbar.socialWork')}</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/members">{t('navbar.members')}</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/about">{t('navbar.aboutUs')}</Link>
        </li>
        <li className="highlight" onClick={closeMenu}>
          <Link to="/update-info">{t('navbar.updateInfo')}</Link>
        </li>
        <li className="language-switcher-wrapper">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
