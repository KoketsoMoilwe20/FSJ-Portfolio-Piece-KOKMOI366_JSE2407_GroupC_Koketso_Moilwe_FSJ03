// app/signout/page.js
"use client";

import { useEffect } from 'react';
import { auth } from '../firebase'; // Adjust the import path as necessary
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
// import styles from '../styles/SignOut.module.css'; // Add styles if needed

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        // Redirect to home or any other page after sign out
        router.push('/');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div >
      <h1>Signing Out...</h1>
      <p>Please wait...</p>
    </div>
  );
}
