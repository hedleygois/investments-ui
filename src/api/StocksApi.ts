import { Stock } from "../model/Stock";
import { QueryDB, MutateDB } from "./Api";
import { Option, some, none } from "fp-ts/lib/Option";

type Interval = {
  start: Date;
  end: Date;
};

export const QUERY_STOCK_BY_SYMBOL = `
  query BySymbol($symbol: String!) {
    Stock(where: { symbol: { _eq: $symbol } }, order_by: { latest:asc }, distinct_on: [latest]) {
      id,
      symbol,
      price,
      open,
      high,
      low,
      previous,
      latest,
      changeAbs,
      changeP,
      volume,
      updated_at
    }
  }
`;

export const QUERY_SYMBOL_ID_BY_SYMBOL = `
  query IdBySymbol($symbol: String!) {
    StocksSymbol(where: { symbol: { _eq: $symbol } }) {
      id
    }
  }
`;

export const LIST_ALL_SYMBOLS = `
  query AllSymbols {
    StocksSymbol {
      symbol,
      amount
    }
  }
`;

export const QUERY_STOCKS_BETWEEN = `
  query BySymbolBetween($start: timestamptz!, $end: timestamptz!) {
    Stock(where: { updated_at: { _gt: $start, _lte: $end  } }) {
      symbol,
      price,
      open,
      high,
      low,
      previous,
      latest,
      changeAbs,
      changeP,
      active,
      updated_at
    }
  }
`;

export const QUERY_LAST_STOCK_VALUE = `
query LastOfStock($symbols: [String!]!, $size: Int!) {
  Stock(where: {symbol: {_in: $symbols}}, order_by: [{updated_at: desc}, {symbol: desc}], distinct_on: [updated_at, symbol], limit: $size) {
    symbol
    price
    changeP
  }
}
`;

export const SET_STOCK_INACTIVE = `
  mutation Sell($stock: String!) {
    update_Stock(where: { symbol: { _eq: $stock } }, _set:{active: false}) {
      affected_rows
    }
  }
`;

export const BUY_SELL_STOCK = `
  mutation BuyStock($symbol: String!, $amount: Int!) {
    update_StocksSymbol(where: { symbol: { _eq: $symbol } }, _inc: {amount: $amount}) {
      returning {
        amount
      }
    }
  }
`;

// TODO Rename and move these things since components are using these types and components shouldn't be tied to API at all
export type AllSymbolsResponse = {
  symbol: string;
  amount: number;
};

export const fetchAllSymbols = (): Promise<AllSymbolsResponse[]> =>
  QueryDB<AllSymbolsResponse[]>({
    query: LIST_ALL_SYMBOLS,
  })
    .then((res) => res.data.StocksSymbol)
    .catch((error) => {
      console.error(error);
      return [];
    });

export const fetchStocks = ({
  start,
  end,
}: Interval): Promise<Map<string, Stock>> =>
  QueryDB<Stock[]>({
    query: QUERY_STOCKS_BETWEEN,
    variables: {
      start: start.toUTCString(),
      end: end.toUTCString(),
    },
  })
    .then((res) => {
      const stocks = res.data.Stock;
      return stocks.reduce(
        (map, el) => map.set(el.symbol, el),
        new Map<string, Stock>()
      );
    })
    .catch((error) => {
      console.error(error);
      return new Map();
    });

export const fetchHistory = (symbol: string): Promise<Stock[]> =>
  QueryDB<Stock[]>({
    query: QUERY_STOCK_BY_SYMBOL,
    variables: {
      symbol,
    },
  })
    .then((res) => res.data.Stock)
    .catch((error) => {
      console.error(error);
      return [];
    });

export type LastStocksValuesResponse = {
  symbol: string;
  changeP: number;
  price: number;
};

export const fetchLastStocksValues = (
  symbols: string[]
): Promise<Map<string, LastStocksValuesResponse>> => {
  return QueryDB<LastStocksValuesResponse[]>({
    query: QUERY_LAST_STOCK_VALUE,
    variables: {
      symbols,
      size: symbols.length,
    },
  })
    .then((res) =>
      res.data.Stock.reduce(
        (map, el) => map.set(el.symbol, el),
        new Map<string, LastStocksValuesResponse>()
      )
    )
    .catch((error) => {
      console.error(error);
      return new Map();
    });
};

type FetchStockSymbolResponse = {
  id: number;
};

export const fetchSymbolIdBySymbol = (
  symbol: string
): Promise<Option<number>> =>
  QueryDB<FetchStockSymbolResponse[]>({
    query: QUERY_SYMBOL_ID_BY_SYMBOL,
    variables: {
      symbol,
    },
  })
    .then((res) => some(res.data.StocksSymbol[0].id))
    .catch((e) => {
      console.error(e);
      return none;
    });

type BuySellStock = {
  amount: number;
};

export const buySellStock = (
  symbol: string,
  amount: number
): Promise<Option<BuySellStock>> =>
  MutateDB<BuySellStock>({
    query: BUY_SELL_STOCK,
    variables: {
      symbol,
      amount,
    },
  })
    .then((res) => some(res.data.update_StocksSymbol.returning[0]))
    .catch((e) => {
      console.error(e);
      return none;
    });
