import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

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
    <nav className="w-full px-[5%] py-5 bg-gradient-to-br from-white to-cream-soft flex items-center justify-between shadow-md-custom sticky top-0 z-[1000] backdrop-blur-sm transition-all duration-300 border-b-2 border-gold-primary hover:shadow-lg-custom">
      <Link
        to="/"
        className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
      >
        <img
          src="/logo.png"
          alt="Kerala Samajam Vasai East Logo"
          className="h-12 md:h-14 w-auto object-contain"
        />
        <span className="text-xl md:text-2xl font-bold font-poppins tracking-wide bg-gradient-to-br from-gold-accent to-emerald-primary bg-clip-text text-transparent drop-shadow-sm hidden sm:inline">
          {t('navbar.logo')}
        </span>
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className={`md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[1001] transition-all duration-300`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`w-[25px] h-[3px] bg-gradient-to-br from-gold-accent to-emerald-primary rounded-sm transition-all duration-300 block ${isMenuOpen ? 'rotate-45 translate-x-2 translate-y-2' : ''}`}></span>
        <span className={`w-[25px] h-[3px] bg-gradient-to-br from-gold-accent to-emerald-primary rounded-sm transition-all duration-300 block ${isMenuOpen ? 'opacity-0 -translate-x-5' : ''}`}></span>
        <span className={`w-[25px] h-[3px] bg-gradient-to-br from-gold-accent to-emerald-primary rounded-sm transition-all duration-300 block ${isMenuOpen ? '-rotate-45 translate-x-2 -translate-y-2' : ''}`}></span>
      </button>

      {/* Navigation Links */}
      <ul className={`
        md:flex md:list-none md:gap-8 md:items-center md:static md:w-auto md:bg-transparent md:shadow-none md:p-0 md:flex-row
        fixed top-[70px] w-[70%] max-w-[300px] md:max-w-none h-auto bg-gradient-to-br from-white to-cream-soft flex-col items-start justify-start p-5 px-8 gap-0 shadow-[-5px_0_20px_rgba(0,0,0,0.1)] rounded-l-lg transition-all duration-300 z-[1000] overflow-y-auto
        ${isMenuOpen ? 'right-0' : '-right-full'}
        list-none
      `}>
        <li className="md:cursor-pointer md:font-medium md:text-text-dark md:relative md:py-2 md:transition-all md:duration-300 md:text-base w-full md:w-auto py-4 text-lg border-b border-gold-primary/10 md:border-0 group">
          <Link to="/news" onClick={closeMenu} className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.news')}
          </Link>
        </li>
        <li className="md:cursor-pointer md:font-medium md:text-text-dark md:relative md:py-2 md:transition-all md:duration-300 md:text-base w-full md:w-auto py-4 text-lg border-b border-gold-primary/10 md:border-0 group">
          <Link to="/gallery" onClick={closeMenu} className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.gallery')}
          </Link>
        </li>
        <li className="md:cursor-pointer md:font-medium md:text-text-dark md:relative md:py-2 md:transition-all md:duration-300 md:text-base w-full md:w-auto py-4 text-lg border-b border-gold-primary/10 md:border-0 group">
          <Link to="/social-work" onClick={closeMenu} className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.socialWork')}
          </Link>
        </li>
        <li className="md:cursor-pointer md:font-medium md:text-text-dark md:relative md:py-2 md:transition-all md:duration-300 md:text-base w-full md:w-auto py-4 text-lg border-b border-gold-primary/10 md:border-0 group">
          <Link to="/members" onClick={closeMenu} className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.members')}
          </Link>
        </li>
        <li className="md:cursor-pointer md:font-medium md:text-text-dark md:relative md:py-2 md:transition-all md:duration-300 md:text-base w-full md:w-auto py-4 text-lg border-b border-gold-primary/10 md:border-0 group">
          <Link to="/about" onClick={closeMenu} className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.aboutUs')}
          </Link>
        </li>
        <li className="md:text-gold-accent md:font-semibold w-full md:w-auto py-4 md:py-2 text-lg md:text-base group" onClick={closeMenu}>
          <Link to="/update-info" className="text-inherit no-underline block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-gold-primary after:to-emerald-primary after:transition-all after:duration-300 group-hover:after:w-full group-hover:text-gold-accent group-hover:-translate-y-0.5">
            {t('navbar.updateInfo')}
          </Link>
        </li>
        <li className="md:ml-4 md:pl-4 md:border-l md:border-gray-200 border-b-0 after:hidden">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
