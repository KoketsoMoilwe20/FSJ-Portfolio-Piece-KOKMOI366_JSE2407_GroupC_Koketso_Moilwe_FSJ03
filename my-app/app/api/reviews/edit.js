import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function PUT(req) {
  const auth = getAuth();
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { reviewId, productId, rating, comment } = await req.json();

    if (!reviewId || !productId || !rating || !comment) {
      return new Response('Missing required fields', { status: 400 });
    }

    const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      rating,
      comment,
      date: serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: 'Review updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(`Error updating review: ${error.message}`, { status: 500 });
  }
}
