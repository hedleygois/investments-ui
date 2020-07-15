export interface Stock {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latest: string;
  previous: number;
  changeAbs: number;
  changeP: number;
  updated_at: string;
  stockType: number;
}
export enum StockType {
  "FII",
  "Stock",
  "Fund"
}