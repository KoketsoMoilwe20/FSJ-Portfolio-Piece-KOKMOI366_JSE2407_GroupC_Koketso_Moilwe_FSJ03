"use client";

import { useRouter, useSearchParams } from 'next/navigation';
// import styles from '../styles/ProductFilters.module.css';

export default function ProductFilters({ categories, currentCategory, currentSort, searchQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "") {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    params.set('page', '1'); // Reset to first page when filters change
    router.push(`/?${params.toString()}`);
  };

  return (
    <div >
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />
      
      <select
        value={currentCategory}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      <select
        value={currentSort}
        onChange={(e) => handleFilterChange('sort', e.target.value)}
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}