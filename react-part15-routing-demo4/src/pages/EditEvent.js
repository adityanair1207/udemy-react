import { Link, useParams } from "react-router-dom";

const EditEventPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Edit Event Page</h1>
      <p>Edit {params.eventId}</p>
      <Link to=".." relative="path">
        Back to details
      </Link>
    </>
  );
};

export default EditEventPage;
