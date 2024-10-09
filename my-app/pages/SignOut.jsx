// components/SignOut.js
import { logOut } from "../app/authFunctions"; // Import your signOut function from your auth helper

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
      alert('Signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
