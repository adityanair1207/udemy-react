import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DateRange from "../DateRange";
import CampaignList from "../../CampaignList/CampaignList";
import { Provider } from "react-redux";
import store from "../../store";

describe("DateRange component", () => {
  test("accepts start date and end date values", () => {
    render(<DateRange />);

    const startDateElement = screen.getByLabelText("Start Date");
    fireEvent.change(startDateElement, { target: { value: "2020-11-11" } });

    const endDateElement = screen.getByLabelText("End Date");
    fireEvent.change(endDateElement, { target: { value: "2020-12-12" } });

    expect(startDateElement.value).toBe("2020-11-11");
    expect(endDateElement.value).toBe("2020-12-12");
  });

  test("renders error message if end date is before start date and submit is clicked", async () => {
    render(<DateRange />);

    const startDateElement = screen.getByLabelText("Start Date");
    fireEvent.change(startDateElement, { target: { value: "2020-11-11" } });

    const endDateElement = screen.getByLabelText("End Date");
    fireEvent.change(endDateElement, { target: { value: "2020-11-10" } });

    const submitButton = screen.getByText("Filter");
    fireEvent.click(submitButton);

    const errorElement = await screen.findByText(
      "End date cannot be before start date."
    );

    expect(errorElement).toBeInTheDocument();
  });

  test("removes error message if clear is clicked", async () => {
    render(
      <Provider store={store}>
        <CampaignList />
      </Provider>,
      <DateRange />
    );

    const startDateElement = screen.getByLabelText("Start Date");
    fireEvent.change(startDateElement, { target: { value: "2020-11-11" } });

    const endDateElement = screen.getByLabelText("End Date");
    fireEvent.change(endDateElement, { target: { value: "2020-11-10" } });

    const submitButton = screen.getByText("Filter");
    fireEvent.click(submitButton);

    const errorElement = await screen.findByText(
      "End date cannot be before start date."
    );

    const clearButton = screen.getByText("Reset");
    fireEvent.click(clearButton);

    expect(errorElement).not.toBeInTheDocument();
  });
});
