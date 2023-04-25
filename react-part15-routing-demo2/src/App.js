import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import RootLayout from "./pages/Root";
import Error from "./pages/Error";
import ProductDetailPage from "./pages/ProductDetail";

const router = createBrowserRouter([
  // { path: "/", element: <HomePage /> },
  // { path: "/products", element: <ProductsPage /> },

  {
    path: "/",
    element: <RootLayout />, // for navigation
    errorElement: <Error />, // for error page
    children: [
      { /* path: "" */ index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> }, // productId (name of your choice) is dynamic path parameter
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
