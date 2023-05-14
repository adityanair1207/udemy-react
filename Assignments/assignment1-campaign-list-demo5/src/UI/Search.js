// import Form from "react-bootstrap/Form";
import styles from "./Search.module.css";

const Search = (props) => {
  const searchHandler = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    // <Form.Group className="mb-3">
    //   <Form.Control
    //     type="text"
    //     placeholder="Search by Campaign"
    //     onChange={searchHandler}
    //   />
    // </Form.Group>

    <input
      type="text"
      placeholder="Search by Campaign"
      onChange={searchHandler}
      className={styles.input}
    ></input>
  );
};

export default Search;
