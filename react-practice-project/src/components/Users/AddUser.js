import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };
  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const addUserHandler = (event) => {
    event.preventDefault();

    console.log(nameInputRef.current.value, ageInputRef.current.value);
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (
      enteredUsername.trim().length === 0 ||
      //+enteredAge < 1 || // works without + too. + forces string to number conversion
      enteredAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input!",
        message: "Please enter all details!",
      });
      return;
    }
    if (+enteredAge < 1) {
      // works without + too. + forces string to number conversion
      setError({
        title: "Invalid age!",
        message: "Please enter valid age(in years)!",
      });
      return;
    }
    let enteredData = {
      id: Math.random(),
      name: enteredUsername,
      age: enteredAge,
    };
    //console.log(enteredData);
    props.onAddUser(enteredData);
    // setEnteredUsername("");
    // setEnteredAge("");
    nameInputRef.current.value = ""; // only do in rare cases like this
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError();
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onCloseClick={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form /*className={styles.input}*/ onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            //value={enteredUsername}
            //onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            /*min="0"*/ step="1"
            //value={enteredAge}
            //onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
