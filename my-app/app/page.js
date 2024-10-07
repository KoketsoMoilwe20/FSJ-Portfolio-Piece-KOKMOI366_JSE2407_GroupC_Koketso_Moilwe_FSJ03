// This is a Server Component as we don't have "use client" here
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import styles from './styles/page.module.css'; 
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, limit, orderBy, startAfter } from "firebase/firestore";
import { firebaseConfig } from "@/uploadData";

// Fetch products from the API, handle errors if they occur
async function fetchProducts(page = 1, search = '', category = '', sort = '') {
  const params = new URLSearchParams({
    skip: (page - 1) * 20,
    limit: 20,
  });

  if (search) {
    params.append('search', search);
  }
  if (category) {
    params.append('category', category);
  }
  if (sort) {
    params.append('sortBy', 'price');
    params.append('order', sort);
  }

  const url = `https://next-ecommerce-api.vercel.app/products?${params.toString()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store', // Ensure data is always fresh
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

// Main products page component (Server Component)
export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1; // Get the current page from URL query (searchParams)
  const searchQuery = searchParams.search || '';
  const category = searchParams.category || '';
  const sortOrder = searchParams.sort || '';
  let products;

  try {
    products = await fetchProducts(page, searchQuery, category, sortOrder); // Fetch products for the current page
  } catch (error) {
    return (
      <div>
        <h1>Error Loading Products</h1>
        <p>{error.message}</p>
        {/* Optionally, provide a link to go back or retry */}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Construct the query string to pass to each ProductCard
  const queryString = new URLSearchParams(searchParams).toString();

  return (
    <div>
      <h1>Products</h1>

      {/* Render product grid */}
      <div className={styles.productGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} queryString={queryString} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination 
        currentPage={page} 
        totalItems={125} 
        itemsPerPage={20}
        search={searchQuery}
        category={category}
        sort={sortOrder} 
      />
    </div>
  );
}
