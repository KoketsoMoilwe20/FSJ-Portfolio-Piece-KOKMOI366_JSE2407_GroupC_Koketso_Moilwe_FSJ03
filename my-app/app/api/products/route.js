import { getDocs, query, where, orderBy, limit, startAfter, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Fuse from "fuse.js";  // Add Fuse.js for search functionality

const firebaseConfig = { /* your firebase config */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortOrder = searchParams.get('sort') || 'asc'; 
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  let productsRef = collection(db, 'products');
  let constraints = [];

  // Filtering and searching constraints
  if (category) constraints.push(where('category', '==', category));
  
  const productsQuery = query(productsRef, ...constraints, orderBy('price', sortOrder), limit(pageSize));

  try {
    const snapshot = await getDocs(productsQuery);
    let products = snapshot.docs.map(doc => doc.data());

    // Apply Fuse.js search on client-side
    if (searchQuery) {
      const fuse = new Fuse(products, { keys: ['title'] });
      products = fuse.search(searchQuery).map(result => result.item);
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
