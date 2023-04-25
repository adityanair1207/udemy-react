import { Link, json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return (
    <>
      <h1>New Event Page</h1>
      <EventForm />
    </>
  );
};

export default NewEventPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not add event." }, { status: 500 });
  }

  return redirect("/events");
};
