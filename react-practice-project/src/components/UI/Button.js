import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type || "button"} // "button" type is a fallback in case type is not specified in AddUser.js component
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
