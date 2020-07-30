import { OperationType } from "../model/OperationType";
import { fetchSymbolIdBySymbol, buySellStock } from "../api/StocksApi";
import {
  operateStock as operateStockApi,
  operateFund as operateFundApi,
} from "../api/OperationsApi";
import { pipe } from "fp-ts/lib/pipeable";
import { map, getOrElse, fold as foldO } from "fp-ts/lib/Option";
import {
  fetchFundByIdWithValue,
  buySellFund,
  BuySellFundResponse,
  BuySellFund,
  fetchFundByIdWithValueFP,
  buySellFundFP,
} from "../api/FundsApi";
import { toError, left, Either, right, fold as foldE } from "fp-ts/lib/Either";
import {
  chain,
  tryCatch,
  fromEither,
  filterOrElse,
  map as mapTE,
  fold as foldTE,
  getOrElseW,
} from "fp-ts/lib/TaskEither";
import { of as ofT } from "fp-ts/lib/Task";

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
  fundId: number;
  valueToOperate: number;
  operation: number;
};

// This whole process should  be done with  RXJS or something Fluture?
export const operateFund = ({
  fundId,
  valueToOperate,
  operation,
}: OperateFund): Promise<
  Error | BuySellFundResponse
> /* Do not propagate fp-ts to the compnents */ => {
  const getValueToOperate = (operation: number, value: number) =>
    operation === OperationType.BUY.valueOf()
      ? value + valueToOperate
      : value - valueToOperate;

  return pipe(
    tryCatch(() => fetchFundByIdWithValue(fundId), toError),
    chain((idWithValue) => {
      if (idWithValue) {
        const { value } = idWithValue;
        const valueToOperation = getValueToOperate(operation, value);
        return tryCatch(
          () => operateFundApi(fundId, valueToOperation, operation),
          toError
        );
      }
      return fromEither(
        left(
          new Error(
            `For some reason we couldn't fetch the requested fund: ${fundId} with its value.`
          )
        )
      );
    }),
    filterOrElse(
      (response) => !!response,
      () =>
        new Error("Some error occurred when trying to register the operation")
    ),
    chain((response) =>
      // We filtered that this response is not undefined
      // Mixing Promises and TaskEither is just horrible. Have to refactor to use TaskEither or Promises everywhere
      // This propagates the BuySellFund | undefined type which  is not nice
      tryCatch(() => buySellFund(fundId, response?.value!), toError)
    ),
    chain((response) =>
      response
        ? fromEither(right(response))
        : fromEither(
            left(
              new Error(
                `For some reason it wasn't possible to update the funds value`
              )
            )
          )
    ),
    getOrElseW(ofT)
  )();
};
// return fundId
//   ? fetchFundByIdWithValue(fundId).then((idWithValue) => {
//       if (idWithValue) {
//         const { value } = idWithValue;
//         const valueToOperation =
//           operation === OperationType.BUY.valueOf()
//             ? value + valueToOperate
//             : value - valueToOperate;
//         return operateFundApi(fundId, valueToOperation, operation).then(() =>
//           buySellFund(fundId, valueToOperation)
//         );
//       }
//       console.error(
//         `For some reason we couldn't fetch the requested fund: ${fundId} with its value.`
//       );
//     })
//   : Promise.resolve(undefined);

export const operateFundFP = ({
  fundId,
  valueToOperate,
  operation,
}: OperateFund): Promise<
  Error | BuySellFundResponse
> /* Do not propagate fp-ts to the compnents */ => {
  const getValueToOperate = (operation: number, value: number) =>
    operation === OperationType.BUY.valueOf()
      ? value + valueToOperate
      : value - valueToOperate;

  return pipe(
    tryCatch(() => fetchFundByIdWithValueFP(fundId), toError),
    chain((idWithValueOpt) =>
      pipe(
        idWithValueOpt,
        foldO(
          () =>
            fromEither(
              left(
                new Error(
                  `For some reason we couldn't fetch the requested fund: ${fundId} with its value.`
                )
              )
            ),
          (data) => {
            const { value } = data;
            const valueToOperation = getValueToOperate(operation, value);
            return tryCatch(
              () => operateFundApi(fundId, valueToOperation, operation),
              toError
            );
          }
        )
      )
    ),
    filterOrElse(
      (response) => !!response,
      () =>
        new Error("Some error occurred when trying to register the operation")
    ),
    chain((response) =>
      tryCatch(() => buySellFundFP(fundId, response?.value!), toError)
    ),
    chain((response) =>
      pipe(
        response,
        foldO(
          () =>
            fromEither(
              left(
                new Error(
                  `For some reason it wasn't possible to update the funds value`
                )
              )
            ),
          (data) => fromEither(right(data))
        )
      )
    ),
    getOrElseW(ofT)
  )();
};
