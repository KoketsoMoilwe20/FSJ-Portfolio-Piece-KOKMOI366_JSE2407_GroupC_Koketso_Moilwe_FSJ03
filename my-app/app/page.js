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
