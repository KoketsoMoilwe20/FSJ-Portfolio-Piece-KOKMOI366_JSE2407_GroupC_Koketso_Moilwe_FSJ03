'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import styles from '../styles/productList.module.css'; 

const PRODUCTS_API = 'https://next-ecommerce-api.vercel.app/products';

/**
 * ProductList component that displays a list of products with pagination.
 * Fetches products from an API and handles loading and error states.
 * 
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.products - The initial array of products to display.
 * @param {number} props.page - The current page number.
 * 
 * @returns {JSX.Element} The rendered product list component.
 */

export default function ProductList({ products, page }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(products);

  /**
   * Fetch products for the given page number.
   * 
   * @param {number} page - The page number to fetch.
   */
  const fetchProducts = async (page) => {
    try {
      setLoading(true); //Set loading state to true
      const res = await fetch(`${PRODUCTS_API}?skip=${(page - 1) * 20}&limit=20`);

      // Check if the response is okay, otherwise throw an error
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProductData(data.products); //Update product data state
      setError(null); //Set error state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); //Set loading state to false
    }
  };

  // Fetch products when the page number changes
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page]);

  // Render loading component if data is being fetched
  if (loading) return <Loader />;

  // Render error message if an error occured
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* Product Grid */}
      <div className={styles.productGrid}>
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={page} />
    </div>
  );
}

/**
 * Fetches products on the server side for the given page number.
 * 
 * @param {Object} context - The context object containing the query parameters.
 * @returns {Object} The server-side props for the ProductList component.
 */
export async function getServerSideProps(context) {
  const page = context.query.page || 1; //Default to page 1 if not specified
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
