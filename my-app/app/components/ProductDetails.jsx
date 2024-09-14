import styles from '../products/[id]/productDetails.module.css';


/**
 * Fetches detailed information about a product from the API.
 * 
 * @param {string} id - The unique identifier of the product to fetch.
 * @returns {Promise<Object>} The product details in JSON format.
 * @throws Will throw an error if the network request fails.
 */

async function getProductDetails(id) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, { cache: 'no-store' });
  
   // Check if the response is okay, otherwise throw an error
  if (!res.ok) {
    throw new Error('Failed to fetch product details');
  }
  return res.json();
}

/**
 * ProductDetails component for displaying detailed information about a specific product.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.params - The parameters object containing route parameters.
 * @param {string} props.params.id - The product ID extracted from the route parameters.
 * 
 * @returns {JSX.Element} The rendered product details component.
 */

export default async function ProductDetails({ params }) {
  // Fetch product details using the product ID from the route parameters
  const product = await getProductDetails(params.id); // Getting product ID from params

  return (
    <div className={styles.container}>
      {/* Product Title */}
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
        {/* Back to products link */}
        <a href="/products" className={styles.backButton}>← Back to Products</a>
      </div>
    </div>
  );
}
