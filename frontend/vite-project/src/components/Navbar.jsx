import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Kerala Samajam Vasai East</Link>

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
          <Link to="/news">News</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/gallery">Gallery</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/social-work">Social Work</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/members">Members</Link>
        </li>
        <li onClick={closeMenu}>
          <Link to="/about">About Us</Link>
        </li>
        <li className="highlight" onClick={closeMenu}>
          <Link to="/update-info">Update Info</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
