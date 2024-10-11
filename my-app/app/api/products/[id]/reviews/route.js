// app/api/products/[id]/reviews/route.js
import { db } from "@/app/firebase"; // Ensure your Firebase setup is correctly exporting the Firestore instance
import { getAuth } from "firebase-admin/auth";
import { doc, addDoc, deleteDoc, updateDoc, collection, getDocs } from "firebase/firestore";

// Middleware for verifying Firebase ID token
const verifyToken = async (req) => {
  const authHeader = req.headers.authorization; //contains the token used for authentication
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split('Bearer ')[1];
  const auth = getAuth();
  const decodedToken = await auth.verifyIdToken(token);
  return decodedToken;
};

// Handle POST request to submit a review
export async function POST(req, { params }) {
  const { id } = params; // The product ID
  const { rating, comment, reviewerName, reviewerEmail } = await req.json();

  if (!rating || !comment) {
    return new Response(JSON.stringify({ message: "Rating and comment are required" }), { status: 400 });
  }

  try {
    const user = await verifyToken(req); // Verify that the user is authenticated
    const review = {
      rating,
      comment,
      reviewerName: reviewerName || user.name || "Anonymous",
      reviewerEmail: reviewerEmail || user.email,
      date: new Date().toISOString(),
    };

    // Add the review to the product's subcollection
    await addDoc(collection(db, `products/${id}/reviews`), review);

    return new Response(JSON.stringify({ message: "Review added successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// Handle PUT request to update a review
export async function PUT(req, { params }) {
  const { id } = params; // The product ID
  const { reviewId, rating, comment } = await req.json(); // The review ID and updated data

  if (!reviewId || !rating || !comment) {
    return new Response(JSON.stringify({ message: "Review ID, rating, and comment are required" }), { status: 400 });
  }

  try {
    const user = await verifyToken(req); // Verify that the user is authenticated
    const reviewRef = doc(db, `products/${id}/reviews`, reviewId);

    // Update the review with the new data
    await updateDoc(reviewRef, {
      rating,
      comment,
      date: new Date().toISOString(), // Update date to reflect edit time
    });

    return new Response(JSON.stringify({ message: "Review updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// Handle DELETE request to remove a review
export async function DELETE(req, { params }) {
  const { id } = params; // The product ID
  const { reviewId } = await req.json(); // The review ID to delete

  if (!reviewId) {
    return new Response(JSON.stringify({ message: "Review ID is required" }), { status: 400 });
  }

  try {
    const user = await verifyToken(req); // Verify that the user is authenticated
    const reviewRef = doc(db, `products/${id}/reviews`, reviewId);

    // Delete the review
    await deleteDoc(reviewRef);

    return new Response(JSON.stringify({ message: "Review deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

// Handle GET request to fetch reviews
export async function GET(req, { params }) {
  const { id } = params; // The product ID

  try {
    const reviewsRef = collection(db, `products/${id}/reviews`);
    const snapshot = await getDocs(reviewsRef);
    const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
