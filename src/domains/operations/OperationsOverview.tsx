import React from "react";
import { OperationsTable } from "./OperationsTable";
import {
  listStockOperations,
  listFundsOperations,
} from "../../api/OperationsApi";
import styled from "styled-components";
import tw from "twin.macro";

export const OperationsOverview = () => (
  <OverviewContainer>
    <StocksContainer>
      <OperationsTable fetchData={listStockOperations} />
    </StocksContainer>
    <OperationsTable fetchData={listFundsOperations} />
  </OverviewContainer>
);

const OverviewContainer = styled.div`
  ${tw`flex flex-column m-2`}
`;

const StocksContainer = styled.div`
  ${tw`mb-4`}
`;
