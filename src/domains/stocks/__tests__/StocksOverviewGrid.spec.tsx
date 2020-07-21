import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { StocksOverviewGrid } from "../StocksOverviewGrid";
import { LastStocksValuesResponse } from "../../../api/StocksApi";
import { MemoryRouter, Router } from "react-router";
import { createMemoryHistory } from "history";

describe("StocksOverviewGrid", () => {
  const stocks = new Map<string, LastStocksValuesResponse>([
    ["HYPE3", { symbol: "HYPE3", changeP: 1, price: 2 }],
    ["HBOR3", { symbol: "HBOR3", changeP: -1, price: 3 }],
  ]);

  it("renders the correct information for each stock", async () => {
    render(
      <MemoryRouter>
        <StocksOverviewGrid stocks={stocks} />
      </MemoryRouter>
    );
    await screen.findByText("HYPE3");

    expect(screen.getByText("HYPE3")).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HYPE3/i)).getByText("1.00%")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HYPE3/i)).getByText("R$2.00")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HYPE3/i)).getByText("1.00%")
    ).toHaveClass("MuiTypography-colorPrimary");

    expect(screen.getByText("HYPE3")).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HBOR3/i)).getByText("-1.00%")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HBOR3/i)).getByText("R$3.00")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/info-card-HBOR3/i)).getByText("-1.00%")
    ).toHaveClass("MuiTypography-colorError");
  });

  it("redirects when the card is clicked", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <StocksOverviewGrid stocks={stocks} />
      </Router>
    );
    await screen.findByText("HYPE3");
    fireEvent.click(screen.getByTestId(/info-card-HYPE3/i));
    expect(history.location.pathname).toEqual("/dashboard/stock/detail/HYPE3");
  });
});
