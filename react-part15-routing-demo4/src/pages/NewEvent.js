import { Link } from "react-router-dom";

const NewEventPage = () => {
  return (
    <>
      <h1>New Event Page</h1>
      <Link to=".." relative="path">
        Back to events
      </Link>
    </>
  );
};

export default NewEventPage;
