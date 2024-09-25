"use client"; // This is a Client Component because it uses state or client-side behavior

import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../styles/pagination.module.css'; 

/**
 * Pagination component for navigating through pages of products.
 * 
 * @param {Object} props - The component props. 
 * @param {number} props.currentPage - The current page number.
 * 
 * @returns {JSX.Element} The rendered pagination component.
 */

export default function Pagination({ currentPage, totalItems, itemsPerPage, search, category, sort }) {
  const router = useRouter(); //Access the Next.js router for navigation.
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages
  const searchParams = useSearchParams();


  /**
   * Navigate to the specified page.
   * 
   * @param {number} page - The page number to navigate to.
   */

  // Function to handle page navigation
  const goToPage = (page) => {
    // Update the URL to reflect the new page.
    router.push(`/?page=${page}`);
  };

  return (
    <div className={styles.pagination}>
      {/* Previous button: Disbaled when on the first page */}
      <button 
        className={styles.button}
        disabled={currentPage === 1} 
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>

    {/* Display the current page number */}
      <span className={styles.pageNumber}>Page {currentPage}</span>

    {/* Next button */}
      <button 
        className={styles.button}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
