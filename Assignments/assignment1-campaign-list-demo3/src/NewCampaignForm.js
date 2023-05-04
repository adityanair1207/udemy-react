import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { campaignActions } from "./store";
import { useRef, useState } from "react";

const NewCampaignForm = () => {
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState();
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

    setSubmitting(true);

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

    setSubmitting(false);
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className="mb-3 col-lg-6">
          <Form.Group as={Col}>
            <Form.Label>Campaign Name:</Form.Label>
            <Form.Control
              type="text"
              name="campaignName"
              ref={nameInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Start Date:</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              ref={startDateInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>End Date:</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              ref={endDateInput}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3 col-lg-6">
          <Form.Group as={Col}>
            <Form.Label>User ID:</Form.Label>
            <Form.Control
              type="number"
              name="userId"
              ref={userIdInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Budget:</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              ref={budgetInput}
              required
            />
          </Form.Group>
        </Row>

        {validation && <p style={{ color: "red" }}>{validation}</p>}

        <Button
          variant={submitting ? "secondary" : "primary"}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};

export default NewCampaignForm;
