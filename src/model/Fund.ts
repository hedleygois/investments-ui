import { FundType } from "./FundType";

export interface Fund {
  id: number;
  name: string;
  fund_type: number;
  updated_at: number;
  FundType: FundType;
}

export interface FundWithValue {
  id: number;
  value: number;
  Fund: Fund;
}
