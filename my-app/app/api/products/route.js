import { getFirestore, collection, query, where, orderBy, limit, getDocs, startAfter, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Fuse from "fuse.js";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortOrder = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const pageSize = 20;

  let productsRef = collection(db, 'products');
  let constraints = [];

  // Category filter
  if (category) {
    constraints.push(where('category', '==', category));
  }

  // Sorting
  if (sortOrder) {
    constraints.push(orderBy('price', sortOrder));
  }

  // Fetch all products initially (without pagination)
  const productsQuery = query(productsRef, ...constraints);
  let products;

  try {
    const snapshot = await getDocs(productsQuery);
    products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fuse.js searching
    if (searchQuery) {
      const fuse = new Fuse(products, { keys: ['title'], threshold: 0.4 });
      products = fuse.search(searchQuery).map(result => result.item);
    }

    // Pagination after filtering
    const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

    // Get total product count for pagination (after Fuse.js search)
    const totalCount = products.length;

    return new Response(JSON.stringify({
      products: paginatedProducts,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
  }
}


// Helper function to get last visible document for pagination
async function getLastVisibleDocument(page, pageSize, category, sortOrder) {
  const productsRef = collection(db, 'products');
  let constraints = [
    orderBy('price', sortOrder),
    limit(page * pageSize)
  ];

  if (category) {
    constraints.unshift(where('category', '==', category));
  }

  const q = query(productsRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs[snapshot.docs.length - 1]; // Last doc for pagination
}

// Helper function to get total product count
async function getTotalCount(category) {
  const productsRef = collection(db, 'products');
  let q = productsRef;
  
  if (category) {
    q = query(q, where('category', '==', category));
  }

  const snapshot = await getDocs(q);
  return snapshot.size;
}
