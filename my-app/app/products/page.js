import Link from 'next/link';
import ProductList from '../components/ProductList';
import styles from "../styles/products.module.css";

async function getProducts(page = 1) {
    const res = await fetch('https://next-ecommerce-api.vercel.app/products?limit=20', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await res.json();
    console.log(data); // Check if data is structured correctly
    return data;
  }
  

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>

      {/* Back Button */}
      <Link href="/" classsName={styles.backButton}>
        <button className={styles.backBtn}>← Back to Home</button>
      </Link>
      <ProductList initialProducts={data} />
    </div>
  );
}