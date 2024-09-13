'use client'; // This tells Next.js this is a client-side component

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from '../styles/productCarousel.module.css'; // Import the CSS module

export default function ProductCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className={styles.carousel}>
      {/* Previous arrow button */}
      <button
        className={styles.prevButton}
        onClick={handlePrev}
      >
        <FaArrowLeft />
      </button>

      {/* Current image */}
      <img
        src={images[currentImageIndex]}
        alt={`Product Image ${currentImageIndex + 1}`}
        className={styles.image}
      />

      {/* Next arrow button */}
      <button
        className={styles.nextButton}
        onClick={handleNext}
      >
        <FaArrowRight />
      </button>

      {/* Image indicators */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${currentImageIndex === index ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
