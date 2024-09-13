import styles from '../../styles/productDetails.module.css';

async function getProductDetails(id) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product details');
  }
  return res.json();
}

export default async function ProductDetails({ params }) {
  const product = await getProductDetails(params.id); // Get product ID from params

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />

<p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Price: ${product.price}</p>
      <p className={styles.category}>Category: {product.category}</p>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.actions}>
        {/* Back to products */}
        <a href="/products" className={styles.backButton}>← Back to Products</a>
      </div>
    </div>
  );
}
