import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value; // amountInputRef.current points to the input element. We need the value in the input element. This value is always a string hence + is required to convert it to a number.
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          step: 1,
          min: 1,
          max: 5,
          defaultValue: 1,
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && (
        <p style={{ color: "red" }}>Please enter a valid amount (1-5).</p>
      )}
    </form>
  );
};

export default MealItemForm;
