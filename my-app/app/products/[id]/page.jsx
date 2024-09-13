"use client"; // This is a Client Component because it uses state or client-side behavior

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './productDetails.module.css'; // Import the CSS module

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const router = useRouter();
  const { id } = params; // Destructure the id from the params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setMainImage(data.images[0]); // Set the first image as the main image
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

  return (
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

      {/* Display rating */}
      <p className={styles.rating}>
        Rating: {product.rating.rate} (Based on {product.rating.count} reviews)
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
        {product.reviews && product.reviews.length > 0 ? (
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index} className={styles.review}>
                <p className={styles.reviewName}>{review.name}</p>
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
      <button 
        onClick={() => router.push('/')}
        className={styles.backButton}
      >
        Back to Products
      </button>
    </div>
  );
}
