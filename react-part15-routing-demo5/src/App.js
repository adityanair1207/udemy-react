import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailsPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetails";
import NewEventPage, { action as newEventAction } from "./pages/NewEvent";
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
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            loader: eventDetailLoader, // common loader for the children route components
            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetailsPage />,
                action: deleteEventAction,
              },
              {
                path: ":edit",
                element: <EditEventPage />,
              },
            ],
          },
          // {
          //   path: ":eventId",
          //   element: <EventDetailsPage />,
          //   loader: eventDetailLoader,
          // },
          // { path: ":eventId/edit", element: <EditEventPage /> },
          { path: "new", element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
