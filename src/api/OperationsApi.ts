import { OperationType } from "../model/OperationType";
import { QueryDB, MutateDB } from "./Api";

export const QUERY_ALL_OPERATIONS = `
  query AllTransactions {
    StockOperations {
      value,
      __typename
      Stock {
        StocksSymbol {
          symbol
        }
        StockType {
          name
        }
      }
      OperationsType {
        name
      }
    }
    FundsOperations {
      value,
      __typename
      Fund {
        name
      }
      OperationsType {
        name
      }
    }
  }
`;

export const QUERY_STOCK_OPERATIONS = `
  query AllStockTransactions {
    StockOperations {
      id,
      value,
      __typename
      StocksSymbol {
        symbol
      }
      OperationsType {
        name
      }
    }
  }
`;

export const QUERY_FUNDS_OPERATIONS = `
  query AllFundsTransactions {
    FundsOperations {
      id,
      value,
      __typename
      Fund {
        name
      },
      OperationsType {
        name
      }
    }
  }
`;

export const QUERY_BUY_SELL_FUND = `
  mutation OperateFund($value: float8!, $fundId: Int!, $operationType: Int!) {
    insert_FundsOperations(objects:{ value: $value, fund_id: $fundId, operation_type: $operationType}) {
      returning {
        id,
        __typename
      }
    }
  }
`;

export const MUTATE_BUY_SELL_STOCK = `
  mutation OperateStock($value: float8!, $symbolId: Int!, $operationType: Int!, $amount: Int!) {
    insert_StockOperations(objects: { value: $value, symbol_id: $symbolId, operation_type: $operationType, amount: $amount}) {
      returning {
        id,
        __typename
      }
    }
  }
`;

export type StockOperation = {
  id: number;
  value: number;
  StocksSymbol: { symbol: string };
  OperationsType: { name: string };
  __typename: "StockOperations";
};

export const listStockOperations = (): Promise<StockOperation[]> => {
  return QueryDB<StockOperation[]>({
    query: QUERY_STOCK_OPERATIONS,
  })
    .then((res) => res.data.StockOperations)
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export type FundsOperation = {
  id: number;
  value: number;
  Fund: { name: string };
  OperationsType: { name: string };
  __typename: "FundsOperations";
};

export const listFundsOperations = (): Promise<FundsOperation[]> => {
  return QueryDB<FundsOperation[]>({
    query: QUERY_FUNDS_OPERATIONS,
  })
    .then((res) => res.data.FundsOperations)
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export type Operation = StockOperation | FundsOperation;

export const operateFund = (
  fundId: number,
  value: number,
  type: OperationType
): Promise<number> => {
  return MutateDB<number>({
    query: QUERY_BUY_SELL_FUND,
    variables: {
      value,
      fundId,
      operationType: type.valueOf() + 1,
    },
  })
    .then((res) => res.data.insert_FundsOperations.returning[0])
    .catch((e) => {
      console.error(e);
      return -1;
    });
};

type BuySellStock = {
  symbolId: number;
  value: number;
  amount: number;
  operationType: OperationType;
};

export const operateStock = ({
  symbolId,
  value,
  operationType,
  amount,
}: BuySellStock) =>
  MutateDB<boolean>({
    query: MUTATE_BUY_SELL_STOCK,
    variables: {
      symbolId,
      operationType: operationType.valueOf(),
      value,
      amount,
    },
  })
    .then(() => true)
    .catch((e) => {
      console.error(e);
      return false;
    });
