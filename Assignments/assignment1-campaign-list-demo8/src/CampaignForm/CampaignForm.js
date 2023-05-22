import { useDispatch } from "react-redux";
import { campaignActions } from "../store/campaign-slice";
import { useRef, useState } from "react";
import styles from "./CampaignForm.module.css";
import Button from "../UI/Button";

const CampaignForm = () => {
  const dispatch = useDispatch();

  const [validation, setValidation] = useState();

  const nameInput = useRef("");
  const startDateInput = useRef("");
  const endDateInput = useRef("");
  const budgetInput = useRef("");
  const userIdInput = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    let startDate = new Date(startDateInput.current.value);
    let endDate = new Date(endDateInput.current.value);

    if (endDate <= startDate) {
      setValidation("End date cannot be before start date.");
      return;
    }
    if (validation) {
      setValidation();
    }

    startDate =
      startDate.getMonth() +
      1 +
      "/" +
      startDate.getDate() +
      "/" +
      startDate.getFullYear();
    endDate =
      endDate.getMonth() +
      1 +
      "/" +
      endDate.getDate() +
      "/" +
      endDate.getFullYear();

    dispatch(
      campaignActions.addCampaign({
        name: nameInput.current.value,
        startDate,
        endDate,
        Budget: parseInt(budgetInput.current.value),
        userId: parseInt(userIdInput.current.value),
      })
    );

    nameInput.current.value = "";
    startDateInput.current.value = "";
    endDateInput.current.value = "";
    budgetInput.current.value = "";
    userIdInput.current.value = "";
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.group}>
          <label htmlFor="campaignName">Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            id="campaignName"
            ref={nameInput}
            required
          ></input>
        </div>

        <div className={styles.group}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            ref={startDateInput}
            required
          ></input>
        </div>

        <div className={styles.group}>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            ref={endDateInput}
            required
          ></input>
        </div>

        {validation && (
          <p style={{ color: "red", textAlign: "center", margin: 0 }}>
            {validation}
          </p>
        )}

        <div className={styles.group}>
          <label htmlFor="userId">User ID</label>
          <input
            type="number"
            name="userId"
            id="userId"
            ref={userIdInput}
            required
          ></input>
        </div>

        <div className={styles.group}>
          <label htmlFor="budget">Budget (in $USD)</label>
          <input
            type="number"
            name="budget"
            id="budget"
            ref={budgetInput}
            required
          ></input>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default CampaignForm;
