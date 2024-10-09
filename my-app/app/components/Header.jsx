// Header.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../styles/Navbar.module.css';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>E-Commerce Store</span>
        </Link>

        <div className={styles.authContainer}>
          {user ? (
            <>
              <p className={styles.welcomeMessage}>Welcome, {user.email}</p>
              <Link href="/signout" className={styles.authButton}>Sign Out</Link>
            </>
          ) : (
            <>
              <p className={styles.welcomeMessage}>Welcome, please sign in or sign up</p>
              <Link href="/signin" className={styles.authButton}>Sign In</Link>
              <Link href="/signup" className={styles.authButton}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
