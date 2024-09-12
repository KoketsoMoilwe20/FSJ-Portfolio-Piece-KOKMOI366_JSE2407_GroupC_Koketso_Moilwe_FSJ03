import Link from "next/link";
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Our E-commerce Store</h1>
      <p className={styles.description}>
        Browse our collection of amazing products and find the best deals!
      </p>
      <div className={styles.grid}>
        <Link href="/products" className={styles.card}>
          <h2>View Products &rarr;</h2>
          <p>Explore our range of products and find what you need!</p>
        </Link>
        <Link href="/about" className={styles.card}>
          <h2>About Us &rarr;</h2>
          <p>Learn more about our store and our mission.</p>
        </Link>
        <Link href="/contact" className={styles.card}>
          <h2>Contact Us &rarr;</h2>
          <p>Have questions? Get in touch with our support team.</p>
        </Link>
        <Link href="/cart" className={styles.card}>
          <h2>Your Cart &rarr;</h2>
          <p>View the items you've added to your cart and proceed to checkout.</p>
        </Link>
      </div>
    </main>
  );
}