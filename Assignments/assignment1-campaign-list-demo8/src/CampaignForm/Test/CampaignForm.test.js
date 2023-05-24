import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CampaignForm from "../CampaignForm";
import { Provider } from "react-redux";
import store from "../../store";
import CampaignList from "../../CampaignList/CampaignList";

describe("CampaignForm component", () => {
  test("accepts form data", () => {
    render(
      <Provider store={store}>
        <CampaignForm />
      </Provider>
    );

    const campaignNameElement = screen.getByLabelText("Campaign Name");
    fireEvent.change(campaignNameElement, { target: { value: "Test" } });

    const startDateElement = screen.getByLabelText("Start Date");
    fireEvent.change(startDateElement, { target: { value: "2023-05-01" } });

    const endDateElement = screen.getByLabelText("End Date");
    fireEvent.change(endDateElement, { target: { value: "2023-05-31" } });

    const userIDElement = screen.getByLabelText("User ID");
    fireEvent.change(userIDElement, { target: { value: 10 } });

    const budgetElement = screen.getByLabelText("Budget (in $USD)");
    fireEvent.change(budgetElement, { target: { value: 111111 } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(campaignNameElement.value).toBe("");
    expect(startDateElement.value).toBe("");
    expect(endDateElement.value).toBe("");
    expect(userIDElement.value).toBe("");
    expect(budgetElement.value).toBe("");
  });

  test("displays campaign data in CampaignList component after submission", async () => {
    render(
      <Provider store={store}>
        <CampaignList />
      </Provider>
    );

    const campaignNameElement = await screen.findByText("Test");
    const startDateElement = await screen.findByText("01/05/2023");
    const endDateElement = await screen.findByText("31/05/2023");
    const userIDElement = await screen.findByText("Clementina DuBuque");
    const budgetElement = await screen.findByText("111111");

    expect(campaignNameElement).toBeInTheDocument();
    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
    expect(userIDElement).toBeInTheDocument();
    expect(budgetElement).toBeInTheDocument();
  });
});
