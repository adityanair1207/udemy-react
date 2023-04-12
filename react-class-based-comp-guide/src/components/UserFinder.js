import React, { useState, useEffect, Component } from "react";
import Users from "./Users";
import styles from "./UserFinder.module.css";
import ErrorBoundary from "./ErrorBoundary";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  render() {
    return (
      <>
        <input
          className={styles.finder}
          type="search"
          onChange={this.searchChangeHandler.bind(this)}
        />
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <input
//         className={styles.finder}
//         type="search"
//         onChange={searchChangeHandler}
//       />
//       <Users users={filteredUsers} />
//     </>
//   );
// };

export default UserFinder;
