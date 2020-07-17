import React, { useState, useEffect } from "react";
import { fetchAllSymbols, fetchLastStocksValues } from "../../api/StocksApi";
import { Stock } from "../../model/Stock";
import { CircularProgress } from "@material-ui/core";
import { InvestmentOverviewGrid } from "./InvestmentOverviewGrid";
import { StyledH3 } from "../../components/header/Header";

export const InvestmentsOverview = () => {
  const [stocksState, setStockState] = useState<
    Map<string, boolean> | undefined
  >();
  const [stocks, setStocks] = useState<Map<string, Stock> | undefined>(
    undefined
  );

  useEffect(() => {
    fetchAllSymbols()
      .then((symbolsResponse) => {
        const state = symbolsResponse.reduce(
          (map, { symbol, amount }) => map.set(symbol, amount > 0),
          new Map<string, boolean>()
        );
        setStockState(state);
        return fetchLastStocksValues(
          symbolsResponse.map(({ symbol }) => symbol)
        );
      })
      .then(setStocks);
  }, []);

  return (
    <>
      {stocks && (
        <div
          style={{
            backgroundColor: "#BACDE8",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <StyledH3>Active</StyledH3>
          <InvestmentOverviewGrid
            stocks={
              new Map(
                Array.from(stocks.entries()).filter(
                  ([_, { symbol }]) => !!stocksState?.get(symbol)
                )
              )
            }
          />
        </div>
      )}
      {stocks && (
        <div
          style={{
            backgroundColor: "#CCEEFF",
            opacity: 0.5,
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          <h3>Inactive</h3>
          <InvestmentOverviewGrid
            stocks={
              new Map(
                Array.from(stocks.entries()).filter(
                  ([_, { symbol }]) => !stocksState?.get(symbol)
                )
              )
            }
          />
        </div>
      )}
      {!stocks && <CircularProgress />}
    </>
  );
};
