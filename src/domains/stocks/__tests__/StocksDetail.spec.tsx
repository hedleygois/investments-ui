import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { StocksDetails } from "../StocksDetail";

Date.now = () => new Date(2020, 7, 21).getTime();

describe("StockDetail", () => {
  async function setup() {
    const history = createMemoryHistory();
    history.push("/dashboard/stock/detail/HYPE3");
    render(
      <Router history={history}>
        <StocksDetails />
      </Router>
    );
    await screen.findByTestId("price-volume-chart");
  }

  beforeEach(setup);

  it("renders a chart", async () => {
    expect(screen.getByTestId("price-volume-chart")).toBeInTheDocument();
  });

  it("renders an all time price variation information first", () => {
    const allTime = screen.getAllByTestId(/info-card-price variation/i)[0];
    expect(within(allTime).getByText("Price Variation")).toBeInTheDocument();
    expect(within(allTime).getByText("(All Time)")).toBeInTheDocument();
    expect(within(allTime).getByText("R$15.00")).toBeInTheDocument();
    expect(within(allTime).getByText("400.000000%")).toBeInTheDocument();
  });

  it("renders a six months price variation information second", () => {
    const sixMonths = screen.getAllByTestId(/info-card-price variation/i)[1];
    expect(within(sixMonths).getByText("Price Variation")).toBeInTheDocument();
    expect(within(sixMonths).getByText("(6 Months)")).toBeInTheDocument();
    expect(within(sixMonths).getByText("R$12.00")).toBeInTheDocument();
    expect(within(sixMonths).getByText("250.000000%")).toBeInTheDocument();
  });

  it("renders a one month price variation information third", () => {
    const month = screen.getAllByTestId(/info-card-price variation/i)[2];
    expect(within(month).getByText("Price Variation")).toBeInTheDocument();
    expect(within(month).getByText("(Month)")).toBeInTheDocument();
    expect(within(month).getByText("R$14.00")).toBeInTheDocument();
    expect(within(month).getByText("333.333333%")).toBeInTheDocument();
  });

  it("renders a one week price variation information forth", () => {
    const week = screen.getAllByTestId(/info-card-price variation/i)[3];
    expect(within(week).getByText("Price Variation")).toBeInTheDocument();
    expect(within(week).getByText("(Week)")).toBeInTheDocument();
    expect(within(week).getByText("R$18.00")).toBeInTheDocument();
    expect(within(week).getByText("1000.000000%")).toBeInTheDocument();
  });

});
