"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/app/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { db } from '@/app/firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import styles from './productDetails.module.css';
import Head from 'next/head';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const paddedId = id.toString().padStart(3, "0"); // Pad ID for Firestore
        const docRef = doc(db, 'products', paddedId); // Firestore document reference
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() }; // Combine document ID with data
          setProduct(data);
          setMainImage(data.images[0]); // Set the first image as the main image
        } else {
          throw new Error('No such product exists!');
        }
      } catch (error) {
        setError('Failed to load product. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    if (id) {
      fetchProduct();
    }

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!reviewText || reviewRating === 0) {
      setSubmitError("Please provide both rating and review.");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken(); // Get the ID token
      const res = await fetch(`/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: reviewText,
          rating: reviewRating,
          reviewerName: user.displayName || 'Anonymous',
          reviewerEmail: user.email,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setReviewText('');
      setReviewRating(0);
      setSubmitSuccess('Review submitted successfully!');
      setSubmitError('');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitError('Failed to submit review. Please try again later.');
      setSubmitSuccess('');
    }
  };

  const handleReviewEdit = (reviewId) => {
    const reviewToEdit = product.reviews.find(review => review.id === reviewId);
    setEditingReview(reviewToEdit);
    setReviewText(reviewToEdit.comment);
    setReviewRating(reviewToEdit.rating);
  };

  const handleReviewUpdate = async () => {
    if (!reviewText || reviewRating === 0) {
      setSubmitError("Please provide both rating and review.");
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken(); // Get the ID token
      const res = await fetch(`/api/products/${id}/reviews`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          reviewId: editingReview.id,
          comment: reviewText,
          rating: reviewRating,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update review');
      }

      const updatedProduct = await res.json();
      setProduct(updatedProduct);
      setEditingReview(null);
      setReviewText('');
      setReviewRating(0);
      setSubmitSuccess('Review updated successfully!');
      setSubmitError('');
    } catch (error) {
      console.error('Error updating review:', error);
      setSubmitError('Failed to update review. Please try again later.');
      setSubmitSuccess('');
    }
  };

  const handleReviewDelete = async (reviewId) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        const token = await auth.currentUser.getIdToken(); // Get the ID token
        const res = await fetch(`/api/products/${id}/reviews`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ reviewId }),
        });

        if (!res.ok) {
          throw new Error('Failed to delete review');
        }

        const updatedProduct = await res.json();
        setProduct(updatedProduct);
        setSubmitSuccess('Review deleted successfully!');
        setSubmitError('');
      } catch (error) {
        console.error('Error deleting review:', error);
        setSubmitError('Failed to delete review. Please try again later.');
        setSubmitSuccess('');
      }
    }
  };

  const sortedReviews = () => {
    if (!product?.reviews) return [];
    return [...product.reviews].sort((a, b) => {
      if (sortMethod === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortMethod === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

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
            priority={true}
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
                  priority={false}
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
                  <li key={index} className={styles.tagItem}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h2 className={styles.reviewTitle}>Reviews</h2>
        <div className={styles.reviewForm}>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows={4}
          />
          <input
            type="number"
            min="1"
            max="5"
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
            placeholder="Rating (1-5)"
          />
          {editingReview ? (
            <button onClick={handleReviewUpdate}>Update Review</button>
          ) : (
            <button onClick={handleReviewSubmit}>Submit Review</button>
          )}
          {submitError && <p className={styles.error}>{submitError}</p>}
          {submitSuccess && <p className={styles.success}>{submitSuccess}</p>}
        </div>

        <h3 className={styles.reviewSortTitle}>Sort Reviews by:</h3>
        <select onChange={(e) => setSortMethod(e.target.value)} value={sortMethod}>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>

        {sortedReviews().map((review) => (
          <div key={review.id} className={styles.review}>
            <p className={styles.reviewText}>{review.comment}</p>
            <p className={styles.reviewRating}>Rating: {review.rating}</p>
            <p className={styles.reviewAuthor}>{review.reviewerName}</p>
            <button onClick={() => handleReviewEdit(review.id)}>Edit</button>
            <button onClick={() => handleReviewDelete(review.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
