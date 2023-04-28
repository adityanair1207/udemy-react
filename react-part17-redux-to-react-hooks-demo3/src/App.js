import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./containers/Products";
import Favorites from "./containers/Favorites";
import RootLayout from "./components/UI/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
