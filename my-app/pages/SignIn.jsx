"use client";
import { useState } from 'react';
import { signIn } from '../app/authFunctions'; // Import your signIn function from your auth helper

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      await signIn(email, password);
      alert('Signed in successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignIn;
