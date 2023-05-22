import styles from "./Search.module.css";

const Search = (props) => {
  const searchHandler = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by Campaign"
      onChange={searchHandler}
      className={styles.input}
    ></input>
  );
};

export default Search;
