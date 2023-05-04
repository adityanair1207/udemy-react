import { useRef, useState } from "react";

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
    <form onSubmit={dateSubmitHandler}>
      <label>Start-Date:</label>
      <input type="date" name="startDate" ref={startDateInput}></input>
      <br />
      <label>End-Date :</label>
      <input type="date" name="endDate" ref={endDateInput}></input>
      &nbsp;
      <button type="submit">Submit</button>&nbsp;
      <button onClick={clearHandler}>Clear</button>
      {validation && <p style={{ color: "red" }}>{validation}</p>}
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
