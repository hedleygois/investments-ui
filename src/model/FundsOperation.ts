import { OperationType } from "./OperationType";

export interface FundsOperations {
  id: number;
  value: number;
  name: string;
  type: OperationType;
}

export function isFundsOperations(operation: any): operation is FundsOperations {
  return operation["__typename"] === "FundsOperations";
}
