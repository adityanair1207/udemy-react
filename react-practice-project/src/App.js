import { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHanlder = (userData) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, userData];
    });
  };
  //console.log(users);

  return (
    <>
      <AddUser onAddUser={addUserHanlder} />
      <UsersList users={usersList} />
    </>
  );
}

export default App;
