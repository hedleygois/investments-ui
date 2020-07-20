import React from "react";
import { CircularProgress } from "@material-ui/core";
import { StocksOverviewLayout } from "./StocksOverviewLayout";
import styled from "styled-components";
import tw from "twin.macro";
import { useStocksState } from "./StocksHooks";

export const StocksOverview = () => {
  const { stocksState, stocks } = useStocksState();

  return (
    <>
      {stocks && (
        <StocksOverviewLayout
          header="Active"
          active
          stocks={
            new Map(
              Array.from(stocks.entries()).filter(
                ([_, { symbol }]) => !!stocksState?.get(symbol)
              )
            )
          }
        />
      )}
      {stocks && (
        <InactiveOverviewLayoutContainer>
          <StocksOverviewLayout
            header="Inactive"
            stocks={
              new Map(
                Array.from(stocks.entries()).filter(
                  ([_, { symbol }]) => !stocksState?.get(symbol)
                )
              )
            }
          />
        </InactiveOverviewLayoutContainer>
      )}
      {!stocks && <CircularProgress />}
    </>
  );
};

const InactiveOverviewLayoutContainer = styled.div`
  ${tw`mt-4`}
`;
