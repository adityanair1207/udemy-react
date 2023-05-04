const Search = (props) => {
  const searchHandler = (event) => {
    props.onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      name="search"
      placeholder="Search by name"
      onChange={searchHandler}
    ></input>
  );
};

export default Search;
