import Link from 'next/link';
import ProductCarousel from './ProductCarousel';
import Image from 'next/image';
import styles from '../styles/ProductCard.module.css'; 

/**
 *  ProductCard component that displays a product's image, title, price, and category.
 * If the product has multiple images, it displays a carousel of images.
 * 
 * @param {Object} props - The component props. 
 * @param {Object} props.product - The product data to display.
 * @param {string} props.product.id - The unique identifier for the product.
 * @param {string} props.product.title - The title of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string} props.product.category - The category of the product.
 * @param {Array<string>} props.product.images - An array of image URLs for the product.
 * 
 * @returns {JSX.Element} The rendered product card component.
 */

export default function ProductCard({ product, queryString }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        
        {/* Render a carousel if there are multiple images, otherwise show  a single image */}
        {product.images && product.images.length > 1 ? (
          <ProductCarousel images={product.images} />
        ) : (
          <Image 
          src={product.images[0]} 
          alt={product.title} 
          width={500} // Set the width based on your design
          height={500} // Set the height based on your design
          className={styles.productImage}
          priority={true} // Optional: prioritize above-the-fold images
        />
        )}

        {/* Link to the product detail page */}
        <Link href={`/products/${product.id}?${queryString}`} className={styles.productLink}>
          <h3 className={styles.productTitle}>{product.title}</h3>
        </Link>

        {/* Display product price */}
        <p className={styles.productPrice}>${product.price}</p>

        {/* Display product category */}
        <p className={styles.productCategory}>Category: {product.category}</p>
      </div>
    </div>
  );
}