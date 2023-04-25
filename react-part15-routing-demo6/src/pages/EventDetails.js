import {
  useLoaderData,
  json,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailsPage = () => {
  //const data = useLoaderData();
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return (
    <>
      <h1>Event Details Page</h1>
      <EventItem event={event} />
    </>
  );
};

export default EventDetailsPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Could not fetch event." }, { status: 500 });
  } else {
    return response;
  }
};

export const action = async ({ request, params }) => {
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
};
