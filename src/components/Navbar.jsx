// Navbar.js

import React, { useState } from 'react';
import styles from './../styles/navbar.module.css';
import logo from './../images/fatWhaleLogo.jpeg';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <img src={logo} className={styles.icon} />
        </div>

      <div className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.linkItem}>Home</Link>
        <Link to="/menus" className={styles.linkItem}>Menu</Link>
        <Link to="/about" className={styles.linkItem}>About Us</Link>
        <Link to="/login" className={`${styles.linkItem} ${styles.mobileLogin}`}>Login</Link>
        {/* Include login link only in desktop */}
      </div>
    <Link to="/login" className={styles.desktopLogin}>Login</Link>
      {/* Burger icon for mobile */}
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={`${styles.line} ${isMenuOpen ? styles.line1 : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.line2 : ''}`}></div>
        <div className={`${styles.line} ${isMenuOpen ? styles.line3 : ''}`}></div>
      </div>

    </div>
  );
};

export default Navbar;
