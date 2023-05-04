import Form from "react-bootstrap/Form";

const Search = (props) => {
  const searchHandler = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search by Campaign"
        onChange={searchHandler}
      />
    </Form.Group>
  );
};

export default Search;
