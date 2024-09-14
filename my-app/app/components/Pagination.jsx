"use client"; // This is a Client Component because it uses state or client-side behavior

import { useRouter } from 'next/navigation';
import styles from '../styles/pagination.module.css'; 

/**
 * Pagination component for navigating through pages of products.
 * 
 * @param {Object} props - The component props. 
 * @param {number} props.currentPage - The current page number.
 * 
 * @returns {JSX.Element} The rendered pagination component.
 */

export default function Pagination({ currentPage }) {
  const router = useRouter(); //Access the Next.js router for navigation.


  /**
   * Navigate to the specified page.
   * 
   * @param {number} page - The page number to navigate to.
   */
  
  // Function to handle page navigation
  const goToPage = (page) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className={styles.pagination}>
      <button 
        className={styles.button}
        disabled={currentPage === 1} 
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>

      <span className={styles.pageNumber}>Page {currentPage}</span>

      <button 
        className={styles.button}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
