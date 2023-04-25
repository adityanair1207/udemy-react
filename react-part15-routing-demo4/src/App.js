import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailsPage from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events/",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            // errorElement could be added here as well. If it was, this page would be shown instead of root error page in case of an error.
            loader: eventsLoader,
            // loader: async () => {
            //   const response = await fetch("http://localhost:8080/events");

            //   if (!response.ok) {
            //   } else {
            //     const resData = await response.json();
            //     return resData.events;
            //   }
            // },
          },
          { path: ":eventId", element: <EventDetailsPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
