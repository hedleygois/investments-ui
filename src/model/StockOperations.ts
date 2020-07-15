import { OperationType } from "./OperationType";

export interface StockOperations {
  id: number;
  value: number;
  symbol: string;
  type: OperationType;
}

export function isStockOperations(operation: any): operation is StockOperations {
  return operation["__typename"] === "StockOperations";
}