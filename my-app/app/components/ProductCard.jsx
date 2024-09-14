import Link from 'next/link';
import ProductCarousel from './ProductCarousel';
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

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        
        {/* Render a carousel if there are multiple images, otherwise show  a single image */}
        {product.images && product.images.length > 1 ? (
          <ProductCarousel images={product.images} />
        ) : (
          <img src={product.images[0]} alt={product.title} className={styles.productImage} />
        )}

        {/* Link to the product detail page */}
        <Link href={`/products/${product.id}`} className={styles.productLink}>
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
