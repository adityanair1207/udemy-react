import { Link, useParams } from "react-router-dom";

const EventDetailsPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Event Details Page</h1>
      <p>Event ID: {params.eventId}</p>
      <Link to="edit">Edit event</Link>
      <br />
      <Link to=".." relative="path">
        Back to events
      </Link>
    </>
  );
};

export default EventDetailsPage;
