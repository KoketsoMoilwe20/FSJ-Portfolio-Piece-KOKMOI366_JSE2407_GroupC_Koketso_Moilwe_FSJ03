import { Suspense } from 'react';
import { headers } from "next/headers";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import ProductFilters from "./components/ProductFilters";
import styles from './styles/page.module.css';

// Fetch products from the API
async function fetchProducts(page = 1, search = '', category = '', sort = '') {
  const params = new URLSearchParams({
    page,
    search,
    category,
    sort
  });

  const host = headers().get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const url = `${protocol}://${host}/api/products?${params.toString()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store', // Ensure fresh data fetching
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products at this time. Please try again later.");
  }
}

// Fetch categories from the API
async function fetchCategories() {
  const host = headers().get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const url = `${protocol}://${host}/api/categories`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }
    const data = await res.json();
    return data.categories; // Assuming the API returns { categories: [...] }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories at this time. Please try again later.");
  }
}

// Main products page component (Server Component)
export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const searchQuery = searchParams.search || '';
  const category = searchParams.category || '';
  const sortOrder = searchParams.sort || '';

  try {
    // Fetch products and categories in parallel
    const [productsData, categories] = await Promise.all([
      fetchProducts(page, searchQuery, category, sortOrder),
      fetchCategories()
    ]);
    
    const { products, totalCount, currentPage, totalPages } = productsData;

    // Build query string for preserving filters in pagination
    const queryString = new URLSearchParams(searchParams).toString();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>

        <Suspense fallback={<div>Loading filters...</div>}>
          <ProductFilters 
            categories={categories} 
            currentCategory={category}
            currentSort={sortOrder}
            searchQuery={searchQuery}
          />
        </Suspense>

        {/* Product grid rendering */}
        <div className={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} queryString={queryString} />
            ))
          ) : (
            <div className={styles.noProducts}>No products found.</div>
          )}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalItems={totalCount} 
          itemsPerPage={20}
          totalPages={totalPages}
          search={searchQuery}
          category={category}
          sort={sortOrder} 
        />
      </div>
    );
  } catch (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Error Loading Products</h1>
        <p className={styles.errorMessage}>{error.message}</p>
      </div>
    );
  }
}