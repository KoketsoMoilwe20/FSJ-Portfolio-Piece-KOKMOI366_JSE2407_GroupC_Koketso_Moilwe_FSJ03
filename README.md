## This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). ##

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# orNext.js E-Commerce Store
This project is a fully-functional e-commerce store built with Next.js 14. The store allows users to browse a list of products, navigate between paginated product lists, and view detailed product pages. The application demonstrates dynamic server-side rendering (SSR), client-side navigation, and state management to create an efficient and smooth shopping experience.

Features
Display products in a grid layout with images, prices, categories, and pagination.
Fetch the first 20 products, then load the next 20 as users navigate to subsequent pages.
Infinite scroll or pagination navigation, with server-side fetched products based on current page.
Detailed product view, including product images, description, price, category, tags, stock status, rating, and user reviews.
Error handling and loading states during data fetching.
URL updates for proper page tracking and navigation.
Friendly error messages when data fails to load.
Technologies Used
Next.js 14: A React-based framework used for building the app with server-side rendering and static site generation.
React: Used for managing the client-side state and user interactions.
CSS Modules: To apply scoped, modular styles to components without conflicts.
API Fetching: Data is fetched from the Next E-Commerce API to simulate product listing and detail views.
Project Structure
bash
Copy code
├── components
│   ├── Pagination.jsx         # Handles pagination and navigation between pages
│   ├── ProductCard.jsx        # Displays individual product in a grid
│   └── ProductGallery.jsx     # Image carousel for product detail page
├── pages
│   ├── index.js               # Displays paginated product list
│   ├── products
│   │   └── [id].js            # Detailed view for each product
├── public                     # Public assets like images
├── styles
│   ├── globals.css            # Global styles for the app
│   └── ProductDetail.module.css # CSS modules for product detail styling
└── README.md                  # This file
Getting Started
Follow the instructions below to set up and run the project on your local machine.

Prerequisites
Node.js (v14 or higher) installed on your local machine.
npm or yarn package manager.
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/nextjs-ecommerce.git
cd nextjs-ecommerce
Install the dependencies:

bash
Copy code
npm install
# or
yarn install
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to view the application.

Build for production: To create a production build, run the following command:

bash
Copy code
npm run build
# or
yarn build
This will optimize and bundle your project, making it ready for deployment.

Run in production mode: After building the project, run the following command to start the production server:

bash
Copy code
npm start
Environment Variables
The project uses the public API from https://next-ecommerce-api.vercel.app/ to fetch product data. No additional API keys are required.

Usage Examples
Product Listing Page
When visiting the home page (/), you will see a list of 20 products displayed in a grid format.
Use the pagination controls (next/previous) to navigate through the product pages.
Products are fetched dynamically on the server for each page, ensuring a smooth user experience.
Product Detail Page
Clicking on any product card will navigate to the product detail view.
The product detail page displays the product image gallery, price, category, stock, rating, tags, and reviews.
The URL will update to reflect the product ID (e.g., /products/123).
Error Handling & Loading States
If a product fails to load, a friendly error message will be displayed.
While waiting for product data to load, a loading state will be shown.
Back to Products
The user can navigate back to the product list from the product detail page using the "Back to Products" button.
Contributing
Contributions to the project are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions or suggestions, feel free to reach out via email: your-email@example.com.
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
