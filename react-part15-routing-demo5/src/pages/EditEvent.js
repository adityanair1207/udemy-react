import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  //const data = useLoaderData();
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return (
    <>
      <h1>Edit Event Page</h1>
      <EventForm event={event} />
      <Link to=".." relative="path">
        Back to event details
      </Link>
    </>
  );
};

export default EditEventPage;
