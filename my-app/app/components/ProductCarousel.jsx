'use client'; // This is a client-side component

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../styles/productCarousel.module.css'; 

/**
 * ProductCarousel component for displaying a carousel of product images.
 * Allows navigation between images using arrow buttons.
 * 
 * @param {Object} props - The component props.
 * @param {Array<string>} props.images - An array of image URLs to display in the carousel.
 * 
 * @returns {JSX.Element} The rendered product carousel component.
 */

export default function ProductCarousel({ images }) {
  // State to keep track of the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // Navigate to the next image in the carousel.
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to the previous image in the carousel.
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
      <Image
          src={images[currentImageIndex]}
          alt={`Product Image ${currentImageIndex + 1}`}
          width={500} // Set the width of the image
          height={500} // Set the height of the image
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
