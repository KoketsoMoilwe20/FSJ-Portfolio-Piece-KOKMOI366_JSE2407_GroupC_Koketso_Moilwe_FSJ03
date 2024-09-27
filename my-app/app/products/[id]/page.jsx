"use client"; // This is a Client Component because it uses state or client-side behavior

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import styles from './productDetails.module.css'; 

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [sortMethod, setSortMethod] = useState('date'); // Default sort by date
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = params; // Destructuring the id from the params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setMainImage(data.images[0]); // Setting the first image as the main image
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const queryString = searchParams.toString();

  // Function to sort reviews based on the selected method
  const sortedReviews = () => {
    if (!product.reviews) return [];

    return [...product.reviews].sort((a, b) => {
      if (sortMethod === 'date') {
        return new Date(b.date) - new Date(a.date); // Sort by date descending
      } else if (sortMethod === 'rating') {
        return b.rating - a.rating; // Sort by rating descending
      }
      return 0;
    });
  };

  return (
    <>
    
    {/* Adding dynamic meta tags using Head */}
    <Head>
    <title>E-Commerce Store</title>
    <meta name="description" content={product.description} />
    <meta property="og:title" content={product.title} />
    <meta property="og:description" content={product.description} />
    <meta property="og:image" content={product.images[0]} />
    <meta property="og:type" content="product" />
    <meta property="og:url" content={`https://your-ecommerce-store.com/products/${id}`} />
  </Head>
    <div className={styles.container}>
      {/* Main product image */}
      <div className={styles.imageContainer}>
        <img 
          src={mainImage} 
          alt={product.title} 
          className={styles.mainImage} 
        />
        
        {/* Thumbnail images */}
        <div className={styles.thumbnailContainer}>
          {product.images.slice(1).map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className={styles.thumbnail} 
                onClick={() => setMainImage(image)} // Change main image on thumbnail click
              />
            </div>
          ))}
        </div>
      </div>
      
      <h1 className={styles.title}>{product.title}</h1>
      <p className={styles.price}>${product.price}</p>
      <p className={styles.category}>Category: {product.category}</p>
      
      {/* Display stock and availability */}
      <p className={styles.stock}>
        {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
      </p>


      {/* Display tags */}
      <div className={styles.tags}>
        {product.tags && product.tags.length > 0 && (
          <div>
            <h2 className={styles.tagsTitle}>Tags:</h2>
            <ul className={styles.tagsList}>
              {product.tags.map((tag, index) => (
                <li key={index} className={styles.tag}>{tag}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display reviews */}
      <div className={styles.reviews}>
        <h2 className={styles.reviewsTitle}>Reviews:</h2>

          {/* Sort Options */}
          <div className={styles.sortOptions}>
          <label>Sort by: </label>
          <button 
            className={`${styles.sortButton} ${sortMethod === 'date' ? styles.active : ''}`} 
            onClick={() => setSortMethod('date')}
          >
            Date
          </button>
          <button 
            className={`${styles.sortButton} ${sortMethod === 'rating' ? styles.active : ''}`} 
            onClick={() => setSortMethod('rating')}
          >
            Rating
          </button>
        </div>

        {sortedReviews().length > 0 ? (
          <ul>
            {sortedReviews().map((review, index) => (
              <li key={index} className={styles.review}>
                <p className={styles.reviewName}><strong>{review.name}</strong></p>
                <p className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</p>
                <p className={styles.reviewComment}>{review.comment}</p>
                <p className={styles.reviewRating}>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      
      {/* Back to products link */}
      <Link href={`/products?${queryString}`} className={styles.backButton}>
        Back to Products
      </Link>
    </div>
    </>
  );
}