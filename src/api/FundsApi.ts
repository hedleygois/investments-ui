import { FundWithValue } from "../model/Fund";
import { MutateDB, QueryDB } from "./Api";

export const QUERY_ALL_FUNDS = `
  query AllFunds {
    Funds {
      id,
      name
    }
  }
`;

export const QUERY_ALL_FUNDS_WITH_LAST_VALUES = `
  query AllFundLastValues {
    FundsValue(order_by: [{updated_at: desc}, {fund_id: asc}], distinct_on: [updated_at, fund_id], limit:10) {
      id
      value
      Fund {
        name
      }
    }
  }
`;

export const QUERY_ALL_FUNDS_WITH_VALUES = `
  query AllFundValues {
    FundsValue(order_by: [{updated_at: desc}, {fund_id: asc}], distinct_on: [updated_at, fund_id]) {
      id
      value
      Fund {
        name
      }
    }
  }
`;

export const QUERY_FUND_BY_ID_WITH_VALUES = `
  query FundByIdWithValue($fundId: Int!) {
    FundsValue(where: { fund_id: { _eq: $fundId } }) {
      value
    }
  }
`;

export const MUTATION_BUY_SELL_FUND = `
  mutation BuySellFund($fundId: Int!, $value: float8) {
    update_FundsValue(where: { fund_id: { _eq: $fundId } }, _set:{ value: $value }) {
      returning {
        value
      }
    }
  }
`;

export const fetchAllFundsWithLastValue = (): Promise<FundWithValue[]> => {
  return QueryDB<FundWithValue[]>({
    query: QUERY_ALL_FUNDS_WITH_LAST_VALUES,
  })
    .then((res) => res.data.FundsValue)
    .catch((e) => {
      console.error(e);
      return [];
    });
};

export type AllFundsResponse = {
  id: number;
  name: string;
};

export const fetchAllFunds = (): Promise<AllFundsResponse[]> =>
  QueryDB<AllFundsResponse[]>({
    query: QUERY_ALL_FUNDS,
  })
    .then((response) => response.data.Funds)
    .catch((error) => {
      console.error(error);
      return [];
    });

type BuySellFund = {
  value: number;
};

type FundByIdWithValueResponse = {
  value: number;
};

export const fetchFundByIdWithValue = (
  fundId: number
): Promise<FundByIdWithValueResponse | undefined> =>
  QueryDB<FundByIdWithValueResponse[]>({
    query: QUERY_FUND_BY_ID_WITH_VALUES,
    variables: {
      fundId,
    },
  })
    .then((res) => res.data.FundsValue[0])
    .catch((e) => {
      console.error(e);
      return undefined;
    });

type BuySellFundResponse = {
  value: number;
};

export const buySellFund = (
  fundId: number,
  value: number
): Promise<BuySellFund | undefined> =>
  MutateDB<BuySellFundResponse>({
    query: MUTATION_BUY_SELL_FUND,
    variables: {
      fundId,
      value,
    },
  })
    .then((res) => res.data.update_FundsValue.returning[0])
    .catch((e) => {
      console.error(e);
      return undefined;
    });
