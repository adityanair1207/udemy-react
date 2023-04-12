import { useState, useEffect, useReducer, useRef } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

// can also be used as an anonymous function inside useReducer
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  //   const [enteredEmail, setEnteredEmail] = useState("");
  //   const [emailIsValid, setEmailIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  //   const [enteredPassword, setEnteredPassword] = useState("");
  //   const [passwordIsValid, setPasswordIsValid] = useState();

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("demo");
  }, []);

  // useEffect(() => {
  //   const timerIdentifier = setTimeout(() => {
  //     console.log("Checking form validity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 600);

  //   return () => {
  //     console.log("CLEAN-UP");
  //     clearTimeout(timerIdentifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const { isValid: emailIsValid } = emailState; // object destructuring and aliasing
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(
        // ok to do this inside useEffect since it will be called only when state/s in dependency have changed
        //emailState.isValid && passwordState.isValid
        emailIsValid && passwordIsValid // using alias. above line is the same
      );
    }, 600);

    return () => {
      console.log("CLEAN-UP");
      clearTimeout(timerIdentifier);
    };
    //}, [emailState, passwordState]);
  }, [emailIsValid, passwordIsValid]); // now useEffect will run only when validities change and not with every keystroke. [emailState.IsValid, passwordState.IsValid] would work the same

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid( // not a good way to update state since it depends on a previous state but function form to get previous state cannot be used
    //   //event.target.value.includes("@") && enteredPassword.trim().length > 6
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   //event.target.value.trim().length > 6 && enteredEmail.includes("@")
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes("@"));
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    //setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      //props.onLogin(enteredEmail, enteredPassword);
      props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailIsValid}
          id="email"
          type="email"
          label="E-Mail"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordIsValid}
          id="password"
          type="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
