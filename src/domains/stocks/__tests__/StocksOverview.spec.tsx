import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { StocksOverview } from "../StocksOverview";

describe("StocksOverview", () => {
  it("fetches the all the stocks symbols", async () => {
    render(
      <MemoryRouter>
        <StocksOverview />
      </MemoryRouter>
    );
    await screen.findByText("Active");
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("ITSA4")).toBeInTheDocument();
    expect(screen.getByText("HYPE3")).toBeInTheDocument();
    expect(screen.getByText("VVAR3")).toBeInTheDocument();
  });

  it("adds the correct stocks under the correct grid", async () => {
    render(
      <MemoryRouter>
        <StocksOverview />
      </MemoryRouter>
    );
    await screen.findByText("Active");
    expect(
      within(screen.getByTestId(/stocks-overview-grid-active/i)).getByText(
        "ITSA4"
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/stocks-overview-grid-active/i)).getByText(
        "ITSA4"
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId(/stocks-overview-grid-inactive/i)).getByText(
        "VVAR3"
      )
    ).toBeInTheDocument();
  });

  it("renders a spinner when loading", () => {
    render(
      <MemoryRouter>
        <StocksOverview />
      </MemoryRouter>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
