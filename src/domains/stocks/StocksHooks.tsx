import { useEffect, useState } from "react";
import { fetchAllSymbols, fetchLastStocksValues, LastStocksValuesResponse } from "../../api/StocksApi";

export const useStocksState = () => {
  const [stocksState, setStockState] = useState<
    Map<string, boolean> | undefined
  >();
  const [stocks, setStocks] = useState<Map<string, LastStocksValuesResponse> | undefined>(
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
  
  return { stocksState, stocks };
}
