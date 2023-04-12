import Button from "./Button";
import Card from "./Card";
import styles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onCloseClick} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onCloseClick}>Close</Button>
        </footer>
      </Card>
    </>
  );
};

export default ErrorModal;
