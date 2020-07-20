import { OperationType } from "../model/OperationType";
import { fetchSymbolIdBySymbol, buySellStock } from "../api/StocksApi";
import {
  operateStock as operateStockApi,
  operateFund as operateFundApi,
} from "../api/OperationsApi";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse } from "fp-ts/lib/Option";
import { fetchFundByIdWithValue, buySellFund } from "../api/FundsApi";

type OperateStock = {
  symbol: string;
  amount: number;
  value: number;
  operation: OperationType;
};

// Refactor this to TaskEither afterwards
// This looks horrible
export const operateStock = ({
  symbol,
  value,
  operation,
  amount,
}: OperateStock) =>
  fetchSymbolIdBySymbol(symbol)
    .then((symbolId) =>
      pipe(
        symbolId,
        map((id) =>
          operateStockApi({
            symbolId: id,
            value,
            operationType: operation.valueOf(),
            amount,
          })
            .then(() => buySellStock(symbol, amount))
            .then(() => true)
            .catch((e) => {
              console.error(e);
              return false;
            })
        ),
        getOrElse(() => Promise.resolve(false))
      )
    )
    .catch((error) => {
      console.error(error);
      return false;
    });

type OperateFund = {
  fundId: number | undefined;
  valueToOperate: number;
  operation: number;
};

export const operateFund = ({
  fundId,
  valueToOperate,
  operation,
}: OperateFund) => {
  return fundId
    ? fetchFundByIdWithValue(fundId).then((idWithValue) => {
        if (idWithValue) {
          const { value } = idWithValue;
          const valueToOperation =
            operation === OperationType.BUY.valueOf()
              ? value + valueToOperate
              : value - valueToOperate;
          return operateFundApi(fundId, valueToOperation, operation).then(() =>
            buySellFund(fundId, valueToOperation)
          );
        }
        console.error(
          `For some reason we couldn't fetch the requested fund: ${fundId} with its value.`
        );
      })
    : Promise.resolve(undefined);
};
