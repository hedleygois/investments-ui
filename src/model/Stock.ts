
// Will be generated by https://graphql-code-generator.com/
//TODO Avoid using this interface here since no query returns all these fields in one go
export interface Stock {
  symbol?: string;
  open?: number;
  high?: number;
  low?: number;
  price?: number;
  volume?: number;
  latest?: string;
  previous?: number;
  changeAbs?: number;
  changeP?: number;
  updated_at?: string;
  stockType?: number;
}
export enum StockType {
  "FII",
  "Stock",
  "Fund"
}