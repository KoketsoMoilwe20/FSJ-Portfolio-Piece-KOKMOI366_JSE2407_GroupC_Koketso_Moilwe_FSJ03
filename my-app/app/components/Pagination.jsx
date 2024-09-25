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
    // Create URLSearchParams to append current filters and sort order to the URL
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page); // Update the page parameter

    // Preserve filters and sort in the query params
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);

    // Update the URL with the new page and query parameters
    router.push(`/?${params.toString()}`);
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
