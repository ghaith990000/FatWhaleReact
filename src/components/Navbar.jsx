// Navbar.js

import React, { useState } from 'react';
import styles from './../styles/navbar.module.css';
import logo from './../images/fatWhaleLogo.jpeg';
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
        <a className={styles.linkItem} href="/">Home</a>
        <a className={styles.linkItem} href="/menu">Menu</a>
        <a className={styles.linkItem} href="/about">About Us</a>
        <a className={`${styles.linkItem} ${styles.mobileLogin}`} href="/login">Login</a>
        {/* Include login link only in desktop */}
      </div>
    <div className={styles.desktopLogin}>Login</div>
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
