'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import styles from '../styles/productList.module.css'; // Import the CSS module

const PRODUCTS_API = 'https://next-ecommerce-api.vercel.app/products';

export default function ProductList({ products, page }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(products);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`${PRODUCTS_API}?skip=${(page - 1) * 20}&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProductData(data.products);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className={styles.productGrid}>
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination currentPage={page} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const page = context.query.page || 1;
  try {
    const res = await fetch(`${PRODUCTS_API}?skip=${(page - 1) * 20}&limit=20`);
    const data = await res.json();
    return {
      props: { products: data.products, page: Number(page) },
    };
  } catch (err) {
    return {
      props: { products: [], page: 1, error: "Failed to load products" },
    };
  }
}
