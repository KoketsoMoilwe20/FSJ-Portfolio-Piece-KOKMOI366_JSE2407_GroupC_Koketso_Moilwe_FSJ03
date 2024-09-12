import './styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="mt-8 text-center">
          <p></p>
        </footer>
      </body>
    </html>
  )
}