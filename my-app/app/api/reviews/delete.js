import { db } from '../../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function DELETE(req) {
  const auth = getAuth();
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const { reviewId, productId } = await req.json();

    if (!reviewId || !productId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const reviewRef = doc(db, 'products', productId, 'reviews', reviewId);
    await deleteDoc(reviewRef);

    return new Response(JSON.stringify({ message: 'Review deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(`Error deleting review: ${error.message}`, { status: 500 });
  }
}
