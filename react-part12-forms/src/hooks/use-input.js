import { useReducer, useState } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReduce = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return initialInputState;
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReduce,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  // const valueChangeHandler = (event) => {
  //   setEnteredValue(event.target.value);
  // };

  // const inputBlurHandler = (event) => {
  //   setIsTouched(true);
  // };

  // const reset = () => {
  //   setEnteredValue("");
  //   setIsTouched(false);
  // };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
