"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css' 

export default function Header() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Fetch categories from the API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    
    fetchCategories();
  }, []);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleRestoreFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');

    setSortOrder('');
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
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

      {/* Search and Category Filter */}

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
         />

         <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
         </select>
      </form>
    </header>
  );
}
