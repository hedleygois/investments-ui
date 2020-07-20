import React, { useState, useEffect } from "react";
import { Operation } from "../../api/OperationsApi";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import tw from "twin.macro";
import styled from "styled-components";

export type OperationsTableProps = {
  fetchData: () => Promise<Operation[]>;
};

export const OperationsTable = ({ fetchData }: OperationsTableProps) => {
  const [operations, setOperations] = useState<Operation[] | undefined>(
    undefined
  );

  useEffect(() => {
    fetchData().then(setOperations);
  }, []);

  return (
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHeader>
          <TableRow>
            <TableCell>Operation Type</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operations?.map((operation) => (
            <TableRow key={operation.id}>
              <TableCell component="th" scope="row">
                {operation.OperationsType.name}
              </TableCell>
              <TableCell>
                {operation.__typename === "StockOperations"
                  ? operation.StocksSymbol.symbol
                  : operation.Fund.name}
              </TableCell>
              <TableCell>{operation.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

const StyledTable = styled(Table)`
  ${tw`min-w-normal`}
`;

const TableHeader = styled(TableHead)`
  ${tw`bg-gray-100 text-white`}
`;
