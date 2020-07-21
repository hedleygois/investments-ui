import { rest } from "msw";
import {
  LIST_ALL_SYMBOLS,
  AllSymbolsResponse,
  QUERY_LAST_STOCK_VALUE,
  LastStocksValuesResponse,
} from "./api/StocksApi";
import { QueryResponse } from "./api/Api";

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
                { symbol: "VVAR3", changeP: 3, price: 20 }
              ],
            },
          } as QueryResponse<LastStocksValuesResponse[]>)
        );
    }
    return res(ctx.status(500), ctx.json({ message: "Not mocked route" }));
  }),
];

export { handlers };
