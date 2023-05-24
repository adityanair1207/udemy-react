import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "../Search";
import CampaignList from "../../CampaignList/CampaignList";
import { Provider } from "react-redux";
import store from "../../store";

describe("Search component", () => {
  test("filters campaign table", async () => {
    render(
      <Provider store={store}>
        <CampaignList />
      </Provider>,
      <Search />
    );

    const searchElement = screen.getByRole("textbox");
    fireEvent.change(searchElement, { target: { value: "o" } });

    const row = await screen.findAllByTestId("row");

    expect(row).toHaveLength(6);
  });
});
