import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET({ params }) {
  const { id } = params;

  try {
    // Pad the ID to ensure it matches the stored Firestore ID format
    const paddedId = id.padStart(3, '0'); 
    const productDoc = await getDoc(doc(db, 'products', paddedId));

    if (!productDoc.exists()) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }

    const productData = productDoc.data();
    return new Response(JSON.stringify(productData), { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), { status: 500 });
  }
}
