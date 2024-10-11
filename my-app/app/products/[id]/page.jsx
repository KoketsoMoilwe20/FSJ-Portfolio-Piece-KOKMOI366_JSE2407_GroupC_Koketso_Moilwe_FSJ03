"use client";

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './productDetails.module.css';
import Head from 'next/head';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;

  // Debug: Log the id
  console.log("Product ID:", id);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);


      try {
        const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);

        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setMainImage(data.images[0]);
        } else {
          throw new Error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const queryString = searchParams.toString();

  const sortedReviews = () => {
    if (!product.reviews) return [];

    return [...product.reviews].sort((a, b) => {
      if (sortMethod === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortMethod === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  return (
    <>
      <Head>
        <title>{product.title} | E-Commerce Store</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://your-ecommerce-store.com/products/${id}`} />
      </Head>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={mainImage}
            alt={product.title}
            className={styles.mainImage}
            width={500}
            height={300}
            layout="responsive"
          />

          <div className={styles.thumbnailContainer}>
            {product.images.slice(1).map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={styles.thumbnail}
                  width={100}
                  height={100}
                  layout="responsive"
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>
        </div>

        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.category}>Category: {product.category}</p>

        <p className={styles.stock}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
        </p>

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

        <div className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>Reviews:</h2>

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

        <Link href={`/${queryString}`} className={styles.backButton}>
          Back to Products
        </Link>
      </div>
    </>
  );
}
