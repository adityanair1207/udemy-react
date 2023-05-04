import { useRef } from "react";

const DateRange = (props) => {
  const startDateInput = useRef("");
  const endDateInput = useRef("");

  const dateSubmitHandler = (event) => {
    event.preventDefault();

    const startDate = new Date(startDateInput.current.value);
    const endDate = new Date(endDateInput.current.value);

    if (endDate < startDate) {
      return;
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
      <input type="date" name="endDate" ref={endDateInput}></input>&nbsp;
      <button type="submit">Submit</button>&nbsp;
      <button onClick={clearHandler}>Clear</button>
    </form>
  );
};

export default DateRange;
