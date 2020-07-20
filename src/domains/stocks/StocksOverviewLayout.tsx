import React from "react";
import { Stock } from "../../model/Stock";
import styled from "styled-components";
import tw from "twin.macro";
import { StocksOverviewGrid } from "./StocksOverviewGrid";
import { StyledH3 } from "../../components/header/Header";

type StocksOverviewLayoutProps = {
  header: string;
  stocks: Map<string, Stock>;
  active?: boolean;
};

const getContainer = (children: React.ReactNode) => (active?: boolean) =>
  active ? (
    <ActiveOverviewContainer>{children}</ActiveOverviewContainer>
  ) : (
    <InactiveOverviewContainer>{children}</InactiveOverviewContainer>
  );

const getBody = (header: string, stocks: Map<string, Stock>) => (
  <>
    <StyledH3>{header}</StyledH3>
    <StocksOverviewGrid stocks={stocks} />
  </>
);

export const StocksOverviewLayout = ({
  header,
  stocks,
  active,
}: StocksOverviewLayoutProps) =>
  getContainer(getBody(header, stocks))(active);

const ActiveOverviewContainer = styled.div`
  ${tw`bg-blue-50 mx-3`}
`;

const InactiveOverviewContainer = styled(ActiveOverviewContainer)`
  ${tw`opacity-50`}
`;
