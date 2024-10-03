import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../products/[id]/productDetails.module.css';


/**
 * Fetches detailed information about a product from the API.
 * 
 * @param {string} id - The unique identifier of the product to fetch.
 * @returns {Promise<Object>} The product details in JSON format.
 * @throws Will throw an error if the network request fails.
 */

async function getProductDetails(id) {
  try {
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      const errorMessage = await res.text(); // Get error message from the response
      console.error('Error fetching product details:', errorMessage);
      throw new Error('Failed to fetch product details');
    }
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error); // Log any errors that occur
    throw error;
  }
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

  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  return (
    <div>
      {/* Dynamic Metadata */}
      <Head>
        <title>{product.title || defaultTitle}</title>
        <meta name="description" content={product.description || defaultDescription} />
        <meta name="keywords" content={`${product.category}, ${product.tags?.join(', ')}`} />
        <meta property="og:title" content={product.title || defaultTitle} />
        <meta property="og:description" content={product.description || defaultDescription} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://your-store.com/products/${product.id}`} />
      </Head>

    <div className={styles.container}>
      {/* Product Title */}
      <h1 className={styles.title}>{product.title}</h1>
      <Image
          src={product.images[0]}
          alt={product.title}
          width={600} // Adjust these as necessary
          height={600} // Adjust these as necessary
          className={styles.productImage}
          priority // Optional: prioritize loading of this image
        />

<p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Price: ${product.price}</p>
      <p className={styles.category}>Category: {product.category}</p>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.actions}>
        {/* Back to products link */}
        <Link href= {`/products?${queryString}`} className={styles.backButton}>← Back to Products</Link>
      </div>
    </div>
    </div>
  );
}
