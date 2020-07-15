import React, { useState, useEffect } from "react";
import {
  Operation,
} from "../../api/OperationsApi";
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    backgroundColor: "darkgray",
    color: "white",
  }
});

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

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>Operation Type</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
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
      </Table>
    </TableContainer>
  );
};
