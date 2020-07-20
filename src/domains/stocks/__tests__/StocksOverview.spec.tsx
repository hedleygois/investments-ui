import React from "react";
import { render, wait } from "@testing-library/react";
import { StocksOverview } from "../StocksOverview";
import {
  LIST_ALL_SYMBOLS,
  AllSymbolsResponse,
  QUERY_LAST_STOCK_VALUE,
  LastStocksValuesResponse,
} from "../../../api/StocksApi";
import { QueryResponse } from "../../../api/Api";
import { MemoryRouter } from "react-router";

// Will just mock fetch for now
// Will move to jest-fetch-mock(give it a try?)/fetch-mock(sure thing) later on
window.fetch = jest.fn();

// Also add test-data bot and then fast-check
describe("StocksOverview", () => {
  it("fetches the all the stocks symbols", async () => {
    ((window.fetch as unknown) as jest.Mock).mockImplementation((_, params) => {
      const body = JSON.parse(params.body);
      if (body.query === LIST_ALL_SYMBOLS) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                StocksSymbol: [
                  { symbol: "ITSA4", amount: 100 },
                  { symbol: "HYPE3", amount: 10 },
                ],
              },
            } as QueryResponse<AllSymbolsResponse[]>),
        });
      }
      if (body.query === QUERY_LAST_STOCK_VALUE) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                Stock: [
                  { symbol: "ITSA4", changeP: 1, price: 2 },
                  { symbol: "HYPE3", changeP: 2, price: 3 },
                ],
              },
            } as QueryResponse<LastStocksValuesResponse[]>),
        });
      }
      return fail();
    });
    render(
      <MemoryRouter>
        <StocksOverview />
      </MemoryRouter>
    );
    await wait(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenNthCalledWith(1, "http://localhost:3001/query", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: LIST_ALL_SYMBOLS,
        }),
      });
      expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost:3001/query", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: QUERY_LAST_STOCK_VALUE,
          variables: {
            symbols: ["ITSA4", "HYPE3"],
            size: 2,
          },
        }),
      });
    });
  });
});
