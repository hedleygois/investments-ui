import { rest } from "msw";
import {
  LIST_ALL_SYMBOLS,
  AllSymbolsResponse,
  QUERY_LAST_STOCK_VALUE,
  LastStocksValuesResponse,
  QUERY_STOCK_BY_SYMBOL,
} from "./api/StocksApi";
import { QueryResponse } from "./api/Api";
import { Stock } from "./model/Stock";
import { formatISO } from "date-fns";

const handlers = [
  rest.post("http://localhost:3001/query", async (req, res, ctx) => {
    // Every body has a query. TODO Fix types
    switch ((req.body as any).query) {
      case LIST_ALL_SYMBOLS:
        return res(
          ctx.json({
            data: {
              StocksSymbol: [
                { symbol: "ITSA4", amount: 100 },
                { symbol: "HYPE3", amount: 10 },
                { symbol: "VVAR3", amount: 0 },
              ],
            },
          } as QueryResponse<AllSymbolsResponse[]>)
        );
      case QUERY_LAST_STOCK_VALUE:
        return res(
          ctx.json({
            data: {
              Stock: [
                { symbol: "ITSA4", changeP: 1, price: 2 },
                { symbol: "HYPE3", changeP: 2, price: 3 },
                { symbol: "VVAR3", changeP: 3, price: 20 },
              ],
            },
          } as QueryResponse<LastStocksValuesResponse[]>)
        );
      case QUERY_STOCK_BY_SYMBOL:
        const symbol = (req.body as any).variables.symbol;
        return res(
          ctx.json({
            data: {
              Stock: [
                {
                  symbol,
                  changeP: 3,
                  price: 5,
                  latest: formatISO(new Date(2019, 10, 20)),
                  volume: 300
                },
                {
                  symbol,
                  changeP: 3,
                  price: 8,
                  latest: formatISO(new Date(2020, 5, 10)),
                  volume: 300
                },
                {
                  symbol,
                  changeP: 1,
                  price: 6,
                  latest: formatISO(new Date(2020, 6, 1)),
                  volume: 100
                },
                {
                  symbol,
                  changeP: 1,
                  price: 2,
                  latest: formatISO(new Date(2020, 6, 18)),
                  volume: 100
                },
                {
                  symbol,
                  changeP: 2,
                  price: 3,
                  latest: formatISO(new Date(2020, 6, 19)),
                  volume: 200
                },
                {
                  symbol,
                  changeP: 3,
                  price: 20,
                  latest: formatISO(new Date(2020, 6, 20)),
                  volume: 300
                },
              ],
            },
          } as QueryResponse<Stock[]>)
        );
    }
    return res(ctx.status(500), ctx.json({ message: "Not mocked route" }));
  }),
];

export { handlers };
