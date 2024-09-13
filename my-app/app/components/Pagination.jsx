"use client"; // This is a Client Component because it uses state or client-side behavior

import { useRouter } from 'next/navigation';
import styles from '../styles/pagination.module.css'; // Import the CSS module

export default function Pagination({ currentPage }) {
  const router = useRouter();

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
