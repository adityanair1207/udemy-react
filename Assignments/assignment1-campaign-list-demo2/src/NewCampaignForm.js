import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { campaignActions } from "./store";
import { useRef } from "react";

const NewCampaignForm = () => {
  const dispatch = useDispatch();

  const nameInput = useRef("");
  const startDateInput = useRef("");
  const endDateInput = useRef("");
  const budgetInput = useRef("");
  const userIdInput = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    let startDate = new Date(event.target[1].value);
    let endDate = new Date(event.target[2].value);

    if (endDate <= startDate) {
      return;
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
        name: event.target[0].value,
        startDate,
        endDate,
        Budget: parseInt(event.target[4].value),
        userId: parseInt(event.target[3].value),
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
      <Form onSubmit={submitHandler}>
        <Row className="mb-3 col-lg-6">
          <Form.Group as={Col}>
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control
              type="text"
              name="campaignName"
              ref={nameInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              ref={startDateInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>End Date</Form.Label>
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
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="number"
              name="userId"
              ref={userIdInput}
              required
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Budget</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              ref={budgetInput}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewCampaignForm;
