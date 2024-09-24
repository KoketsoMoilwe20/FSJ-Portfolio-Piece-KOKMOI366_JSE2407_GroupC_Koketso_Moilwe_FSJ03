"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css' 

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {/* <img src="/online-shop.png" alt="Shop Logo" className={styles.logoImage} /> */}
          <span className={styles.logoText}>E-Commerce Store</span>
        </Link>

        <button onClick={toggleNavbar} className={styles.menuButton}>
          &#9776;
        </button>

        <nav className={`${styles.nav} ${showNavbar ? styles.navVisible : styles.navHidden}`}>
          <Link href="/wishlist" className={styles.navLink}>
            Wishlist
          </Link>
          <Link href="/cart" className={styles.navLink}>
            Cart
          </Link>
          <Link href="/login" className={styles.navLink}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
