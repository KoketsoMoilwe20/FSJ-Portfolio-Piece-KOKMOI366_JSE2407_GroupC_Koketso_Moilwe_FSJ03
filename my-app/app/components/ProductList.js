'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/productList.module.css';

export default function ProductList({ initialProducts }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
    }
  }, [initialProducts]);

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className={styles.productGrid}>
        {currentProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
                src={product.images[0]}
                alt={product.title}
                className={styles.productImage}
             />
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <p className={styles.productCategory}>{product.category}</p>
          </div>
        ))}
      </div>
