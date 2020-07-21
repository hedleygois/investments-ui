import React from "react";
import { Stock } from "../../model/Stock";
import styled from "styled-components";
import tw from "twin.macro";
import { StocksOverviewGrid } from "./StocksOverviewGrid";
import { StyledH3 } from "../../components/header/Header";
import { LastStocksValuesResponse } from "../../api/StocksApi";

type StocksOverviewLayoutProps = {
  header: string;
  stocks: Map<string, LastStocksValuesResponse>;
  active?: boolean;
};

const getContainer = (children: React.ReactNode) => (active?: boolean) =>
  active ? (
    <ActiveOverviewContainer>{children}</ActiveOverviewContainer>
  ) : (
    <InactiveOverviewContainer>{children}</InactiveOverviewContainer>
  );

const getBody = (
  header: string,
  stocks: Map<string, LastStocksValuesResponse>
) => (
  <>
    <StyledH3>{header}</StyledH3>
    {/* Material-ui does not propagate this prop */}
    <div data-testid={`stocks-overview-grid-${header}`}>
      <StocksOverviewGrid stocks={stocks} />
    </div>
  </>
);

export const StocksOverviewLayout = ({
  header,
  stocks,
  active,
}: StocksOverviewLayoutProps) => getContainer(getBody(header, stocks))(active);

const ActiveOverviewContainer = styled.div`
  ${tw`bg-blue-50 mx-3`}
`;

const InactiveOverviewContainer = styled(ActiveOverviewContainer)`
  ${tw`opacity-50`}
`;
