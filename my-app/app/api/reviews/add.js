import { db } from '../../../firebase';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function POST(req) {
  const auth = getAuth();
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Bearer token

  // Verify the user
  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    const { productId, rating, comment } = await req.json();

    if (!rating || !comment || !productId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const reviewData = {
      rating,
      comment,
      date: serverTimestamp(),
      reviewerEmail: email,
      reviewerName: name,
    };

    await addDoc(collection(db, 'products', productId, 'reviews'), reviewData);

    return new Response(JSON.stringify({ message: 'Review added successfully' }), { status: 200 });
  } catch (error) {
    return new Response(`Error adding review: ${error.message}`, { status: 500 });
  }
}
