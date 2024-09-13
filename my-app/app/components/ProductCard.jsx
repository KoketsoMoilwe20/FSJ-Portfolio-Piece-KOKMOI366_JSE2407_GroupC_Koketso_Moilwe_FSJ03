import Link from 'next/link';
import ProductCarousel from './ProductCarousel';
import styles from '../styles/ProductCard.module.css'; // Import the CSS module

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        {/* Only wrap title, price, and category in the Link, not the carousel */}
        {product.images && product.images.length > 1 ? (
          <ProductCarousel images={product.images} />
        ) : (
          <img src={product.images[0]} alt={product.title} className={styles.productImage} />
        )}
        <Link href={`/products/${product.id}`} className={styles.productLink}>
          <h3 className={styles.productTitle}>{product.title}</h3>
        </Link>
        <p className={styles.productPrice}>${product.price}</p>
        <p className={styles.productCategory}>Category: {product.category}</p>
      </div>
    </div>
  );
}
