
// app/layout.js
import Header from './components/Header';
import './styles/globals.css'; // Ensure global styles are applied

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}