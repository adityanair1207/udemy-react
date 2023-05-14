import { useRef, useState } from "react";
import styles from "./DateRange.module.css";
import Button from "./Button";

const DateRange = (props) => {
  const [validation, setValidation] = useState();

  const startDateInput = useRef("");
  const endDateInput = useRef("");

  const dateSubmitHandler = (event) => {
    event.preventDefault();

    const startDate = new Date(startDateInput.current.value);
    const endDate = new Date(endDateInput.current.value);

    if (endDate <= startDate) {
      setValidation("End date cannot be before start date.");
      return;
    }
    if (validation) {
      setValidation();
    }

    props.onDateSubmit(startDate, endDate);
  };

  const clearHandler = () => {
    startDateInput.current.value = "";
    endDateInput.current.value = "";
  };

  return (
    <form onSubmit={dateSubmitHandler} className={styles.form}>
      <div className={styles.group}>
        <label>Start-Date</label>
        <br />
        <input
          type="date"
          name="startDate"
          id="startDate"
          ref={startDateInput}
        ></input>
      </div>
      <div className={styles.group}>
        <label>End-Date</label>
        <br />
        <input
          type="date"
          name="endDate"
          id="endDate"
          ref={endDateInput}
        ></input>
      </div>
      <div className={styles.btnGroup}>
        <Button type="submit">Submit</Button>
        <Button onClick={clearHandler}>Clear</Button>
      </div>
      {validation && <p style={{ color: "red", margin: 0 }}>{validation}</p>}
    </form>
  );
};

export const active_status = (dateFrom, dateTo) => {
  let dateCheck = new Date();

  if (dateFrom === undefined || dateTo === undefined) {
    return;
  }

  let d1 = dateFrom.split("/");
  let d2 = dateTo.split("/");

  dateFrom = new Date(d1[2], d1[0] - 1, d1[1]);
  dateTo = new Date(d2[2], d2[0] - 1, d2[1]);

  return dateCheck > dateFrom && dateCheck < dateTo;
};

export default DateRange;
