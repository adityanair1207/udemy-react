import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(""); // Approach 1
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const [formState, setFormState] = useState(0);
  const formHandler = () => {
    if (formState === 0) {
      setFormState(1);
    }
    if (formState === 1) {
      setFormState(0);
    }
  };

  // const [userInput, setUserInput] = useState( // Approach 2 (not recommended) and 3
  //     {
  //         enteredTitle: "",
  //         enteredAmount: "",
  //         enteredDate: ""
  //     }
  // );

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value); // Approach 1

    // setUserInput( // Approach 2 (not recommended)
    //     {
    //         ...userInput,
    //         enteredTitle: event.target.value
    //     }
    // );

    // setUserInput((prevState) => { // Approach 3
    //     return {...prevState, enteredTitle: event.target.value};
    // });

    //console.log(enteredTitle);
    // console.log(userInput.enteredTitle);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);

    // setUserInput(
    //     {
    //         ...userInput,
    //         enteredAmount: event.target.value
    //     }
    // );

    // setUserInput((prevState) => { // Approach 3
    //     return {...prevState, enteredAmount: event.target.value};
    // });

    //console.log(enteredAmount);
    // console.log(userInput.enteredAmount);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);

    // setUserInput(
    //     {
    //         ...userInput,
    //         enteredDate: event.target.value
    //     }
    // );

    // setUserInput((prevState) => { // Approach 3
    //     return {...prevState, enteredDate: event.target.value};
    // });

    //console.log(enteredDate);
    // console.log(userInput.enteredDate);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    //console.log(expenseData);
    props.onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    formHandler();
  };

  //console.log("ExpenseForm component evaluated");
  if (formState === 1) {
    return (
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2022-12-31"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={formHandler}>
            {/* type="button" so as to not trigger any other event */}
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </form>
    );
  }

  if (formState === 0) {
    return (
      <div className="new-expense__actions" style={{ textAlign: "center" }}>
        <button onClick={formHandler}>Add new expense</button>
      </div>
    );
  }
};

export default ExpenseForm;
